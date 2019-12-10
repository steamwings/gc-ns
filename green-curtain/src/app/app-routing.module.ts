import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '@src/app/app.routes';
import { HomeComponent } from './home/home.component';

var webRoutes : Routes = [
  {path: 'index', redirectTo:'home', pathMatch:'full'}
]
routes.forEach(r => webRoutes.push(r));

@NgModule({
  imports: [RouterModule.forRoot(webRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
