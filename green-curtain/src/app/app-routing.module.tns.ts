import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { AuthGuard } from '@src/app/shared/guards/auth.guard';
import { HomeComponent } from '@src/app/shared/components/home/home.component';


var appRoutes: Routes = [
  {
    path: 'home', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'v', component: HomeComponent, outlet: 'venues' },
      { path: 's', component: HomeComponent, outlet: 'search' },
      { path: 'p', component: HomeComponent, outlet: 'profile' },
    ]
  },
]
routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
