import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ProfileComponent } from '@src/app/profile/profile.component';
import { UserProfileComponent } from '@src/app/profile/user-profile/user-profile.component';
import { AppSharedModule } from "@src/app/shared/shared.module";

@NgModule({
    declarations:[
        ProfileComponent,
        UserProfileComponent,
    ],
    imports:[
        CommonModule,
        AppSharedModule,
    ],
    exports:[
        ProfileComponent,
        UserProfileComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppProfileModule { }