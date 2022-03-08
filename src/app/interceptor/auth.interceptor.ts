import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = {},
    token: string = 'BQCeTsVHQMyt6uFxGgr6UYkW9zyO3uPxQClrvUvE7hJHsJV11LvbkOnnl8gPLSs0Z6clVo8TwyedFnnoebz6pV-qe4kgQmhOPkwPVz827AtLlmNrXPvhBMxAv0iI0qqHd2VsksaJ2C2dPTvOXfOz9tNQYkXnul5FLRA';
    
    headers.Authorization = `Bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headers }));
  }
}
