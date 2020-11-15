import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
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
     * Appends an authentication token to the outbound request and triggers reauthentication flow 
     * for 401 responses from our API.
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.userSvc.isLoggedIn
            && req.url.includes(environment.apiUrl)) {
            const token = this.userSvc.token;
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.log.verbose('token-interceptor request', req);
            // TODO This map is not working
            return next.handle(req).pipe(map(event => {
                this.log.verbose('token-interceptor response', event);
                if(event == null) {
                    this.log.error('tears');
                }
                if (event instanceof HttpErrorResponse
                    && event.url.includes(environment.apiUrl)
                    && event.status === 401) {
                    this.userSvc.reauthenticate();
                    throwError('Unauthorized');
                } else {
                    return event;
                }
            }));
            
        } else {
            this.log.verbose('token-interceptor ignoring request');
            return next.handle(req);
        }
    }
}
