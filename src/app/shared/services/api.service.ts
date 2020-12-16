import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpEvent } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { first, catchError, map, mapTo, filter } from 'rxjs/operators';
import { LogService } from '@src/app/shared/services/log.service';
import { throwError, Observable, concat } from 'rxjs';
import { LoginFormUser, UserFull, UserProfile } from '@src/app/shared/models/user/user.model';

type HttpOptionsJsonResponseType = { headers?: HttpHeaders; observe: "response"; 
  params?: HttpParams | { [param: string]: string | string[]; }; reportProgress?: boolean; 
  responseType?: "json"; withCredentials?: boolean; 
};

type HttpOptionsTextResponseType = { headers?: HttpHeaders; observe: "response"; 
  params?: HttpParams | { [param: string]: string | string[]; }; reportProgress?: boolean; 
  responseType?: "text"; withCredentials?: boolean; 
};

/**
 * Service to handle API calls
 * TODO?: Refactor so we don't always use the same instance
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  private httpHeadersBase = new HttpHeaders({});

  private get httpOptionsJson(): HttpOptionsJsonResponseType { return { 
      headers: this.httpHeadersBase.append('Content-Type', 'application/json'), observe: 'response'
  }}

  private get httpOptionsText(): HttpOptionsTextResponseType { return {
      headers: this.httpHeadersBase, observe: 'response', responseType: 'text'
  }}

  private httpOptionsBlob : HttpOptionsJsonResponseType = 
  { headers: new HttpHeaders({
    'x-ms-blob-type': 'BlockBlob',
    }), 
    observe: "response" 
  };

  constructor(private http: HttpClient, private log: LogService) {
    if (environment.apiHeader === '') {
      throw new Error('No API header.');
    }
    this.httpHeadersBase = this.httpHeadersBase.append(environment.apiHeader, environment.apiKey);
  }

  login(body: LoginFormUser) {
    return this.post<LoginFormUser, UserFull>(body, '/login', StatusContext.LoginRegister);
  }

  register(body: LoginFormUser) {
    return this.post<LoginFormUser, UserFull>(body, '/register', StatusContext.LoginRegister);
  }

  getProfile(id: string) {
    return this.getJson<UserProfile>(`/profile/${id}`);  
  }

  setProfile(body: UserProfile) {
    return this.put(body, '/profile');
  }

  getPicUrl() {
    return this.bodyOf(this.getText<string>('/profile/pic-url'));
  }

  getUploadProfilePicUrl(id: string) {
    return this.bodyOf(this.getText<string>(`/profile/upload-pic-url/${id}`));
     //.pipe(map(x => this.putBlob(pic, x.body)))
  }

  private post<TSend, TReceive>(body: TSend, uri: string, context: StatusContext = StatusContext.General) : Observable<HttpResponse<TReceive>>  {
    this.log.verbose(`POST at ${uri} with ${body}`);
    return this.pipeFirstResponse(this.http.post<TReceive>(this.apiUrl + uri, body, this.httpOptionsJson), context);
  }

  private put<TSend, TReceive>(body: TSend, uri: string, context: StatusContext = StatusContext.General) : Observable<HttpResponse<TReceive>> {
    this.log.verbose(`PUT at ${uri} with ${body}`);
    return this.pipeFirstResponse(this.http.put<TReceive>(this.apiUrl + uri, body, this.httpOptionsJson), context);
  }

  private getJson<T>(uri: string, context: StatusContext = StatusContext.General) {
    return this.get<T>(uri, this.httpOptionsJson, context);
  }

  private getText<T>(uri: string, context: StatusContext = StatusContext.General) {
    return this.get<T>(uri, this.httpOptionsText, context);
  }

  private get<T>(uri: string, httpOptions, context: StatusContext = StatusContext.General) {
    this.log.verbose(`GET at ${uri}`);
    return this.pipeFirstResponse(this.http.get<T>(this.apiUrl + uri, httpOptions), context);
  }

  private putBlob<TSend>(body: TSend, uri: string) : Observable<HttpResponse<Object>> {
    this.log.verbose(`PUT at ${uri} with ${body}`);
    return this.pipeFirstResponse(this.http.put(uri, body, this.httpOptionsBlob), StatusContext.BlobStorage);
  }

  private bodyOf<T>(obs: Observable<HttpResponse<T>>) {
    return obs.pipe(map((resp: HttpResponse<T>) => resp.body));
  }

  /**
   * Filter to only first HttpResponse (and force cast); add catchError
   * @param obs observable from http call
   * @param context context for error handling 
   */
  private pipeFirstResponse<T>(obs : Observable<HttpEvent<T>>, context: StatusContext): Observable<HttpResponse<T>> {
    // TODO Always using first() makes the obs essentially a promise so...refactor?
    return <Observable<HttpResponse<T>>> obs.pipe(catchError(err => this.interpretError(err, context)))
      .pipe(filter(e => e instanceof HttpResponse), first()); 
  }

  private interpretError(error: HttpErrorResponse, context: StatusContext = StatusContext.General) {
    if (error.error instanceof HttpErrorResponse) {
      this.log.error(
        `Client or network error ${error.status} (${error.statusText}):` +
        `${error.error.message}`, error.error.error, error.error);
    } else { // Backend error
      this.log.error(
        `Backend returned ${error.status} (${error.statusText}): ${error.message}`, error.error);
    }
    let msg = '';
    switch (error.status) {
      case 401: msg = 'Authorization error.';
        // TODO Analytics: critical error
        this.log.error('401 should have been consumed by interceptor--and wasn\'t!');
        break;
      case 403: 
        if (context === StatusContext.BlobStorage) {
          msg = 'No permissions for that action. SAS token may be expired.'
          break;
        }
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
  BlobStorage,
  General
}
