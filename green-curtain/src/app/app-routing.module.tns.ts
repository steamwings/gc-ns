import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { environment } from '@src/environments/environment';
import { OrgsComponent } from '@src/app/orgs/orgs.component';
import { SearchComponent } from './search/search.component';


var appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: OrgsComponent, outlet: 'orgs' },
      { path: '', component: SearchComponent, outlet: 'search' },
      { path: '', component: ProfileComponent, outlet: 'profile' },
    ]
  },
]
routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes, {enableTracing: environment.verbose})],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
