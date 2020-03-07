import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { first, catchError } from 'rxjs/operators';
import { LogService } from './log.service';
import { StorageService } from './storage.service';
import { throwError } from 'rxjs';

/**
 * Service to handle API calls
 * TODO?: Refactor so we don't always use the same instance
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private storage: StorageService, private log: LogService) {
    if (environment.apiHeader === '') {
      throw new Error('No API header.');
    }
    this.httpOptions.headers = this.httpOptions.headers.append(environment.apiHeader, environment.apiKey);
  }

  private loginRegister = (body, uri) => this.http.post<HttpResponse<any>>(this.apiUrl + uri, body, this.httpOptions)
    .pipe(catchError(err => this.handleLoginRegisterError(err))).pipe(first())

  // TODO? Type
  login(body) {
    this.log.verbose(`Login called with ${body}`);
    return this.loginRegister(body, '/login');
  }

  // TODO? Type
  register(body) {
    this.log.verbose(`Register called with ${body}`);
    return this.loginRegister(body, '/register');
  }

  private handleLoginRegisterError(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {
      this.log.error(
        `Client or network error ${error.status} (${error.statusText}):` +
        `${error.error.message}`, error.error.error, error.error);
    } else { // Backend error
      this.log.error(
        `Backend returned ${error.status} (${error.statusText}): ${error.message})`, error, error.error);
    }
    switch (error.status) {
      case 404: return throwError('That account was not found.');
      // This will occur for java.net.UnknownHostException
      case 0: return throwError('Are you connected to internet? You may also try restarting the application.');
      default: break;
    }
    return throwError( // Observable with error message
      `Your mysterious number is ${error.status}; please try again later.`);
  }
}
