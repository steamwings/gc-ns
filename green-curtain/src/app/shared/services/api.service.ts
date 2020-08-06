import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { first, catchError } from 'rxjs/operators';
import { LogService } from './log.service';
import { throwError, Observable } from 'rxjs';
import { LoginFormUser, UserFull, UserProfile } from '../models/user/user.model';

/**
 * Service to handle API calls
 * TODO?: Refactor so we don't always use the same instance
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private httpOptions : { headers?: HttpHeaders; observe: "response"; params?: HttpParams | { [param: string]: string | string[]; }; reportProgress?: boolean; responseType?: "json"; withCredentials?: boolean; }
  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), 
    observe: "response" // Allows us to get the HttpResponse. Switching to "event" might be necessary at some point
  };

  constructor(private http: HttpClient, private log: LogService) {
    if (environment.apiHeader === '') {
      throw new Error('No API header.');
    }
    this.httpOptions.headers = this.httpOptions.headers.append(environment.apiHeader, environment.apiKey);
  }

  login(body: LoginFormUser) {
    return this.post<LoginFormUser, UserFull>(body, '/login', StatusContext.LoginRegister);
  }

  register(body: LoginFormUser) {
    return this.post<LoginFormUser, UserFull>(body, '/register', StatusContext.LoginRegister);
  }

  getProfile(id: string) {
    return this.get<UserProfile>(`/profile/${id}`);  
  }

  setProfile(body: UserProfile) {
    return this.put(body, '/profile');
  }

  private post<TSend, TRecieve>(body: TSend, uri: string, context: StatusContext = StatusContext.General) : Observable<HttpResponse<TRecieve>>  {
    this.log.verbose(`POST at ${uri} with ${body}`);
    return this.handleErrorPipeFirst(this.http.post<TRecieve>(this.apiUrl + uri, body, this.httpOptions), context);
  }

  private put<TSend, TRecieve>(body: TSend, uri: string, context: StatusContext = StatusContext.General) : Observable<HttpResponse<TRecieve>> {
    this.log.verbose(`PUT at ${uri} with ${body}`);
    return this.handleErrorPipeFirst(this.http.put<TRecieve>(this.apiUrl + uri, body, this.httpOptions), context);
  }

  private get<T>(uri: string, context: StatusContext = StatusContext.General) {
    this.log.verbose(`GET at ${uri}`);
    return this.handleErrorPipeFirst(this.http.get<T>(this.apiUrl + uri, this.httpOptions), context);
  }

  private handleErrorPipeFirst<T>(obs : Observable<HttpResponse<T>>, context: StatusContext){
    return obs.pipe(first()).pipe(catchError(err => this.handleError(err, context))); 
  }

  private handleError(error: HttpErrorResponse, context: StatusContext) {
    if (error.error instanceof HttpErrorResponse) {
      this.log.error(
        `Client or network error ${error.status} (${error.statusText}):` +
        `${error.error.message}`, error.error.error, error.error);
    } else { // Backend error
      this.log.error(
        `Backend returned ${error.status} (${error.statusText}): ${error.message})`, error.error);
    }
    let msg = '';
    switch (error.status) {
      case 401: msg = 'Authorization error.';
        // TODO Analytics: critical
        this.log.error('401 should have been consumed by interceptor--and wasn\'t!');
        break;
      case 404: msg = 'That account was not found.';
        break;
      case 409: switch(context) {
        case StatusContext.LoginRegister:
          msg = 'That email already exists.';
          break;
        default:
          this.log.error('Unexpected conflict.');
        }
        break;
      // 0 will occur for java.net.UnknownHostException, CORS blocking,
      // and I assume other situations where the request never leaves the client
      case 0: msg = 'Are you connected to internet? Something\'s preventing us from getting there.';
        break;
      default: msg = `Your mysterious number is ${error.status + 161}; please try again later.`;
    }
    return throwError(msg); // Observable with error message
  }

}

enum StatusContext {
  LoginRegister,
  General
}
