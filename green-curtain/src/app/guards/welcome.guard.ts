import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Util } from '../util/util.class';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //Util.alert('WelcomeGuard activated');
    if(!this.userService.seenWelcome){
      this.userService.seenWelcome = true;
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
  
}
