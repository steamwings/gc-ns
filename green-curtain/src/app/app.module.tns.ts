import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from '@src/app/app-routing.module';

import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

import { HideActionBarDirective } from '@src/app/shared/directives/hide-action-bar.directive';
import { ClearNavHistoryDirective } from '@src/app/shared/directives/clear-nav-history.directive';

import { UserService } from '@src/app/shared/services/user.service';
import { StorageService } from '@src/app/shared/services/storage.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

import { AppComponent } from '@src/app/app.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    ProfileComponent,
    HideActionBarDirective,
    ClearNavHistoryDirective,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [
    UserService,
    { provide: StorageService, useClass: LocalStorageService },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
