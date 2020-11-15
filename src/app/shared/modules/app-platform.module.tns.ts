import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
export { RouterExtensions } from "@nativescript/angular";

import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule, registerElement } from '@nativescript/angular';

registerElement('PreviousNextView', () => require('@nativescript/iqkeyboardmanager').PreviousNextView);

import { HideActionBarDirective } from '@src/app/shared/directives/hide-action-bar.directive';
import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';
import { MobileActionBarComponent } from "@src/app/shared/components/mobile-action-bar/mobile-action-bar.component";

@NgModule({
    declarations: [
        HideActionBarDirective,
        ClearNavHistoryDirective,
        MobileActionBarComponent,
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
    ],
    exports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        HideActionBarDirective,
        ClearNavHistoryDirective,
        MobileActionBarComponent
    ],
    providers: [RouterExtensions],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppPlatformModule {}