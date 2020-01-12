import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { HideActionBarDirective } from '@src/app/shared/directives/hide-action-bar.directive';
import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from '@src/app/shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    HideActionBarDirective,
    ClearNavHistoryDirective,
    ProfileComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
