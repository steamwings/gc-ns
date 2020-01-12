import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


var appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'v', component: ProfileComponent, outlet: 'venues' },
      { path: 's', component: ProfileComponent, outlet: 'search' },
      { path: 'p', component: ProfileComponent, outlet: 'profile' },
    ]
  },
]
routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
