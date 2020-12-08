import { Injectable, NgZone } from '@angular/core';
import { ImageAsset, ImageSource, knownFolders, path } from '@nativescript/core';
import * as imagepicker from '@nativescript/imagepicker';
import * as bghttp from '@nativescript/background-http';
import { CancellationToken } from '../utilities/cancellation-token';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _ngZone: NgZone) { }

  selectImageAndUpload(heightWidth: number, url: string, cancellationToken = null) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.selectImage(heightWidth)
      .then(asset => this.upload(asset, url, cancellationToken))
      .then(() => resolve())
      .catch(e => reject(e));
    });
  }

  selectImage(heightWidth: number): Promise<ImageAsset> {
    let context = imagepicker.create({
			mode: 'single',
    });
    return new Promise<ImageAsset>((resolve, reject) => {
      context.authorize()
      .then(() => {
        this._ngZone.run(() => {
          console.log('Presenting NS imagepicker...');
        });
        return context.present();
      }, () => reject('Failed to obtain permissions.'))
      .then((selection) => {
        this._ngZone.run(() => {
          console.log('NS imagepicker selection done: ' + JSON.stringify(selection));
        });
        if (selection && selection.length !== 1) {
          reject('No ImageAsset returned.');
        }
        resolve(selection[0]);
      })
      .catch((e) => {
        console.log(e);
        reject('Mobile ImageService.selectImage failed.');
      });
    });
  }

  upload(asset: ImageAsset, url: string, cancellationToken: CancellationToken = null): Promise<void> {
    var savepath = knownFolders.documents().path;
    var filename = 'img_by_sj_' + new Date().getTime() + '.jpg';
    var filepath = path.join(savepath, filename);
    
    return new Promise<void>((resolve, reject) => {
      ImageSource.fromAsset(asset)
      .then((imageSource: ImageSource) => {
        if (!imageSource.saveToFile(filepath, "jpg")) {
          reject('Failed to save image to ' + savepath);
        }

        var session = bghttp.session("image-upload");
        var request: bghttp.Request = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": filename
            },
            description: "{ 'uploading': '" + filename + "' }",
            androidAutoClearNotification: true,
            androidAutoDeleteAfterUpload: true,
            androidDisplayNotificationProgress: true
        };

        var task = session.uploadFile(filepath, request);
        
        if (cancellationToken) {
          cancellationToken.cancel = task.cancel;
        }

        task.on("responded", (e) => {
          console.log('Server response for image upload is  ' + e.responseCode + ': ' + e.data);
        });
        task.on("error", (e) => {
          reject('Image upload failed with ' + e.error);
        });
        task.on("complete", (e) => {
          resolve();
        });

      }, () => reject('Failed to convert ImageAsset to ImageSource.'))
    });
  }


}
