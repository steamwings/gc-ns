import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Util } from '@src/app/shared/util/util.class';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    Util.alert('WelcomeGuard activated');
    if(!this.user.seenWelcome){
      this.user.seenWelcome = true;
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
  
}
