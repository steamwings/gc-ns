import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponseBase
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { environment } from '@src/environments/environment';
import { UserService } from '@src/app/shared/services/user.service';
import { map, tap, catchError } from 'rxjs/operators';
import { LogService } from '@src/app/shared/services/log.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private userSvc: UserService, private log: LogService) { }

    /**
     * Appends an authentication token to outbound API request; require reauthentication for 401 from API
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.log.info('request intercepted');
        if (req.url.includes(environment.apiUrl)) {
            
            if (!this.userSvc.isLoggedIn) {
                this.userSvc.reauthenticate();
                throwError('Log-in required');
            }

            const token = this.userSvc.token;
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.log.verbose('token-interceptor request', req);
            // TODO Implement token refresh for token expiration
            return next.handle(req).pipe(catchError((error, _) => {
                    this.log.verbose('token-interceptor response', error);
                    
                    if (error instanceof HttpResponseBase
                        && error.status === 401) {
                        console.log('detected 401');
                        // Stop whatever was happening, cut off intercept chain
                        this.userSvc.reauthenticate();
                    }
                    throw error; // Re-throw for down the chain
                }));
            
        } else {
            this.log.verbose('token-interceptor ignoring request');
            return next.handle(req);
        }
    }
}
