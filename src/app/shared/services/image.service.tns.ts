import { Injectable, NgZone } from '@angular/core';
import { File, ImageAsset, ImageSource, knownFolders, path } from '@nativescript/core';
import * as imagepicker from '@nativescript/imagepicker';
import * as bghttp from '@nativescript/background-http';
import { CancellationToken } from '@src/app/shared/utilities/cancellation-token';
import { LogService } from '@src/app/shared/services/log.service';
import { ImageServiceBase } from '@src/app/shared/services/image.service.base'

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ImageServiceBase  {

  constructor(
    private _ngZone: NgZone,
    private log: LogService) { 
      super();
    }

  selectImageAndUpload(uploadUrl: string, cancellationToken: CancellationToken = null) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.selectImage()
      .then(asset => this.saveImageAsset(asset))
      .then(file => this.uploadImage(file, uploadUrl, cancellationToken))
      .then(() => resolve())
      .catch(e => reject(e));
    });
  }

  selectImage(): Promise<ImageAsset> {
    let context = imagepicker.create({
			mode: 'single',
    });
    return new Promise<ImageAsset>((resolve, reject) => {
      context.authorize()
      .then(() => {
        this._ngZone.run(() => {
          this.log.debug('Presenting NS imagepicker...');
        });
        return context.present();
      }, () => reject('Failed to obtain permissions.'))
      .then((selection) => {
        this._ngZone.run(() => {
          this.log.debug('NS imagepicker selection done: ' + JSON.stringify(selection));
        });
        if (!selection || selection.length !== 1) {
          this.log.debug('No ImageAsset returned.');
          reject('No image selected.');
        }
        resolve(selection[0]);
      })
      .catch((e) => {
        console.log(e);
        reject('Mobile ImageService.selectImage failed.');
      });
    });
  }

  // TODO Use API service headers?
  uploadImage(file: File, uploadUrl: string, cancellationToken: CancellationToken = null): Promise<void> {   
    return new Promise<void>((resolve, reject) => {
      var session = bghttp.session("image-upload");
      var request: bghttp.Request = {
          url: uploadUrl,
          method: "POST",
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            "Content-Type": "application/octet-stream",
            "File-Name": file.name
          },
          description: "{ 'uploading': '" + file.name + "' }",
          androidAutoClearNotification: true,
          androidAutoDeleteAfterUpload: true,
          androidDisplayNotificationProgress: true
      };

      var task = session.uploadFile(file.path, request);
      
      if (cancellationToken) {
        cancellationToken.cancel = task.cancel;
      }

      task.on("responded", (e) => {
        this.log.debug('Server response for image upload is  ' + e.responseCode + ': ' + e.data);
      });
      task.on("error", (e) => {
        reject('Image upload failed with ' + e.error);
      });
      task.on("complete", (e) => {
        resolve();
      });
    });
  }

  /**
   * Save an ImageAsset to a file
   * @param asset NativeScript memory-optimized image reference
   * @param filePrefix What the saved file's name should start with
   * @returns Promise with type of NativeScript File
   */
  saveImageAsset(asset: ImageAsset, filePrefix: string = 'img', format: "png" | "jpg" = "jpg"): Promise<File> {
    var savepath = knownFolders.documents().path;
    var filename = filePrefix + new Date().getTime() + '.' + format;
    var filepath = path.join(savepath, filename);

    return new Promise<File>((resolve, reject) => {
      ImageSource.fromAsset(asset)
      .then((imageSource: ImageSource) => { 
        if (!imageSource.saveToFile(filepath, format) || !File.exists(filepath)) {
          reject('Failed to save image to ' + savepath);
        }
        resolve(File.fromPath(filepath))
      });
    })
  }


}
