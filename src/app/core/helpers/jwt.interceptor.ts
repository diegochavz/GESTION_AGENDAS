import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationServiceImpl} from "../http/implement/authentication.service.impl";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationServiceImpl) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.authenticationService.currentUserValue;
    console.log("Entre en Bearer")
    console.log(user)
    if (user != null ) {
      console.log('Bearer '+ user.access)
     // request = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY,'Bearer '+ user.access)})
    }
    return next.handle(request);
  }

}
