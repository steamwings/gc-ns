import { NgModule } from "@angular/core";
import { MaterialModule } from '@src/app/shared/modules/material.module';

import { FooterComponent } from '@src/app/shared/components/footer/footer.component';

// Do-nothing class; only used in mobile, but needs to be injected in shared component classes
export class RouterExtensions {}

@NgModule({
    declarations: [FooterComponent],
    imports: [],
    exports: [
        FooterComponent,
        MaterialModule
    ],
    providers: [
        RouterExtensions,
    ]
})
export class AppPlatformModule {}