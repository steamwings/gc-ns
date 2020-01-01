import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Util } from '../util/util.class';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //Util.alert('AuthGuard activated');
    return this.checkLogin(state.url);
  }

  checkLogin(url: string){
    if (this.authSvc.isLoggedIn()) return true;
    this.authSvc.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
