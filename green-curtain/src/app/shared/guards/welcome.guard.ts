import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private log: LogService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.log.verbose('AuthGuard activated');
    if(!this.user.seenWelcome){
      this.user.seenWelcome = true;
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
  
}
