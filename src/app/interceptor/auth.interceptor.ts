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
    token: string = 'BBQD3HviNTYPWb_SK1KjQz-mFTf7cULcacYqbJWbKqkWh3knYQY-Ta7zZe2yQSHKjOVVf_EjR93oTVayLTp457-GpOZBoYhwu5QuzuFhBN6vqpyyiQdFIeC6hi8QkJQBU-8SW2zcIZ72BKv7TyPSeqf0JPweH0oRG66g';
    
    headers.Authorization = `Bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headers }));
  }
}
