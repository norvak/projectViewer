import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(public service: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const token: string = this.service.getToken();

        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.service.getToken()) });
        }
        // if (!req.headers.has('Content-Type')) {
        //     req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        // }
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}

