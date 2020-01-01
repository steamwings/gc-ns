import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';
import { Routes } from '@angular/router';
import { NavComponent } from '@src/app/components/nav/nav.component';
import { AuthGuard } from '@src/app/guards/auth.guard';
import { HomeComponent } from '@src/app/components/home/home.component';


var appRoutes: Routes = [
]
routes.forEach(r => appRoutes.push(r));

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(appRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
