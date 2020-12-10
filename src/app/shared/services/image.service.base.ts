import { Injectable } from '@angular/core';
import { CancellationToken } from '@src/app/shared/utilities/cancellation-token';

/**
 * Base class for image service.
 * @description Having the base class helps ensure the mobile and web versions have the same interface.
 * (Angular won't let us put an interface in a providers {provide: } statement.)
 */
@Injectable()
export abstract class ImageServiceBase {
    abstract selectImageAndUpload(uploadUrl: string, cancellationToken: CancellationToken) : Promise<void>;
}