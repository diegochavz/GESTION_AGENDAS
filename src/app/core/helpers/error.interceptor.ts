import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationServiceImpl} from "../http/implement/authentication.service.impl";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationServiceImpl) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let errorMessage = '';
      if (err.status >=400 && err.status<500) {
        errorMessage = `${JSON.stringify(err.error)}`;
      } else  {
        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      return throwError(errorMessage);
    }))
  }
}
