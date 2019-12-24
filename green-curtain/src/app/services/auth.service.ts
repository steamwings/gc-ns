import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LoginFormUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn$ = new BehaviorSubject<boolean>(false);
  public redirectUrl: string = null;

  constructor(private router: Router) { }

  isLoggedIn(){
    return this.loggedIn$.value;
  }

  isLoggedIn$(){
    return this.loggedIn$.asObservable();
  }

  login(user: LoginFormUser){ //TODO Call from LoginComponent
    //TODO Do login and use user
    this.loggedIn$.next(true);
    this.navigate();
    return new Promise(() => {});
  }

  register(user: LoginFormUser){ //TODO
    this.navigate();
    this.loggedIn$.next(true);
    return new Promise(() => {});
  }

  private navigate(){
    if (!isNullOrUndefined(this.redirectUrl)) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout(){
    this.loggedIn$.next(false);
    this.router.navigate(['/welcome']);
  }

  resetPassword(email: string){
    return new Promise(() => {});
  }

}
