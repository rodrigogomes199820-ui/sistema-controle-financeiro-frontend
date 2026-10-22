import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly apiOrigin = 'https://sistema-controle-financeiro-backend-dzg6.onrender.com/';

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    const isApiRequest = request.url.startsWith(this.apiOrigin);
    const isPublicAuthRequest = /\/api\/auth\/(login|register)(?:\?|$)/.test(request.url);

    if (!token || !isApiRequest || isPublicAuthRequest) {
      return next.handle(request);
    }

    return next.handle(request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }));
  }
}
