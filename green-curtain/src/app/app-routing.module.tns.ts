import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { ProfileComponent } from '@src/app/profile/profile.component';
import { HomeComponent } from '@src/app/home/home.component';
import { environment } from '@src/environments/environment';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { SearchComponent } from '@src/app/search/search.component';
import { ReviewComponent } from '@src/app/shared/components/review/review.component';
import { SettingsComponent } from '@src/app/shared/components/settings/settings.component';


const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: OrgsComponent, outlet: 'orgs' },
      { path: '', component: SearchComponent, outlet: 'search' },
      { path: '', component: ProfileComponent, outlet: 'profile' },
    ]
  },
  { path: 'review', component: ReviewComponent },
  { path: 'settings', component: SettingsComponent }
];

routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes, {enableTracing: environment.traceRoutes})],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
