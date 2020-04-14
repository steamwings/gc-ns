import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { environment } from '@src/environments/environment';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { LogService } from '../services/log.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private userSvc: UserService, private log: LogService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.userSvc.isLoggedIn
            && req.url.includes(environment.apiUrl)) {
            const token = this.userSvc.token;
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.log.debug(`Authorization token added: ${token}`);
            this.log.verbose('token-interceptor request', req);
        }
        return next.handle(req).pipe(map(resp => {
            this.log.verbose('token-interceptor response', resp);
            if (resp instanceof HttpErrorResponse
                && resp.url.includes(environment.apiUrl)
                && resp.status === 401) {
                this.userSvc.reauthenticate();
                throwError('Unauthorized');
            } else {
                return resp;
            }
        }));
    }
}
