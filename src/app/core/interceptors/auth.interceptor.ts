
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');

    const isLoginOrRegister =
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/register');

    if (!token || isLoginOrRegister) {
      return next.handle(req);
    }

    const requestWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(requestWithToken);
  }
}
