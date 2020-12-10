import { Injectable } from '@angular/core';
import { CancellationToken } from '@src/app/shared/utilities/cancellation-token';
import { ImageServiceBase } from '@src/app/shared/services/image.service.base'

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ImageServiceBase {

  constructor() { super() }

  selectImageAndUpload(uploadUrl: string, cancellationToken: CancellationToken = null) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('Fake select image called')
      resolve();
    });
  }
}
