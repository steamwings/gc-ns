import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '@src/app/shared/services/user.service';
import { Util } from '@src/app/shared/util/util.class';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    Util.alert('AuthGuard activated');
    return this.checkLogin(state.url);
  }

  checkLogin(url: string){
    if (this.user.isLoggedIn) return true;
    this.user.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
