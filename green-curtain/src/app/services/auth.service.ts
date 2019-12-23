import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

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

  login(){ //TODO Call from LoginComponent
    //TODO Do login
    this.loggedIn$.next(true);
    if(!isNullOrUndefined(this.redirectUrl)){
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


}
