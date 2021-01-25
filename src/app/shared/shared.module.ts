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

/**
 * Include "things" which are declared/defined by both mobile and web to reduce identical lines in
 * app.module and app.module.tns. Note that included "things" may have joint or separate definitions,
 * but are defined with the same name for both mobile and web.
 */
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
        httpInterceptorProviders,
    ]
})
export class AppSharedModule { }