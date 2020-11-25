import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationServiceImpl} from "../http/implement/authentication.service.impl";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationServiceImpl) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request).pipe(catchError(err => {
      console.log("ErrorIterceptor -> ",err)
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        //this.authenticationService.logout();
        console.log("401 -> ",err)
        location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
