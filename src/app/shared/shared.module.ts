import { NgModule } from "@angular/core";
import { MyLetDirective } from "@src/app/shared/directives/my-let.directive";
import { AppRoutingModule } from "@src/app/app-routing.module";
import { AppPlatformModule } from '@src/app/shared/modules/app-platform.module';

import { httpInterceptorProviders } from '@src/app/shared/http-interceptors/index';

import { StorageService } from '@src/app/shared/services/storage.service';
import { KeyValueStorage } from '@src/app/shared/services/key-value-storage';
import { UserStorageService } from '@src/app/shared/services/user-storage.service';
import { UserService } from '@src/app/shared/services/user.service';
import { ApiService } from '@src/app/shared/services/api.service';
import { ImageServiceBase } from "@src/app/shared/services/image.service.base";
import { ImageService } from "@src/app/shared/services/image.service";

@NgModule({ 
    declarations:[ 
        MyLetDirective,
    ],
    imports:[
        AppPlatformModule,
        AppRoutingModule,
    ],
    exports:[
        AppPlatformModule,
        AppRoutingModule,
        MyLetDirective,
    ],
    providers: [
        UserService,
        ApiService,
        { provide: KeyValueStorage, useClass: StorageService},
        UserStorageService,
        { provide: ImageServiceBase, useClass: ImageService },
        httpInterceptorProviders,
    ]
})
export class AppSharedModule { }