import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppSharedModule } from '@src/app/shared/shared.module';
import { AppProfileModule } from '@src/app/profile/profile.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '@src/app/app.component';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { SearchComponent } from '@src/app/search/search.component';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { WelcomeComponent } from '@src/app/shared/components/welcome/welcome.component';
import { LoginComponent } from '@src/app/shared/components/login/login.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';
import { PageNotFoundComponent } from '@src/app/shared/components/page-not-found/page-not-found.component';

/**
 * AppModule for web
 */
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    OrgsComponent,
    WelcomeComponent,
    LoginComponent,
    ReviewComponent,
    SettingsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppSharedModule,
    AppProfileModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
