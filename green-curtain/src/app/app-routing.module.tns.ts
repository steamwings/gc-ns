import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { environment } from '@src/environments/environment';


var appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: ProfileComponent, outlet: 'organizations' },
      { path: '', component: ProfileComponent, outlet: 'search' },
      { path: 'profile-start', component: ProfileComponent, outlet: 'profile' },
      // { path: '', component: ProfileComponent, outlet: 'profile' },
    ]
  },
]
routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes, {enableTracing: environment.verbose})],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
