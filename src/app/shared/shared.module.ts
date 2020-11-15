import { NgModule } from "@angular/core";
import { MyLetDirective } from "@src/app/shared/directives/my-let.directive";
import { AppRoutingModule } from "@src/app/app-routing.module";
import { AppPlatformModule } from '@src/app/shared/modules/app-platform.module';

import { httpInterceptorProviders } from '@src/app/shared/http-interceptors/index';

import { StorageService } from '@src/app/shared/services/storage.service';
import { UserService } from '@src/app/shared/services/user.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { ApiService } from '@src/app/shared/services/api.service';

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
        { provide: StorageService, useClass: LocalStorageService},
        httpInterceptorProviders,
    ]
})
export class AppSharedModule { }