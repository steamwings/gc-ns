import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { routes } from '@src/app/app.routes';
import { environment } from '@src/environments/environment';
import { HomeComponent } from './home/home.component.tns';
import { OrgsComponent } from './orgs/orgs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: OrgsComponent, outlet: 'orgs' },
      { path: '', component: SearchComponent, outlet: 'search' },
      { path: '', component: ProfileComponent, outlet: 'profile' },
    ]
  },
];

routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes, {enableTracing: environment.traceRoutes})],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
