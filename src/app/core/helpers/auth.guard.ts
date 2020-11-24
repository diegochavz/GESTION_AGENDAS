import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationServiceImpl} from "../http/implement/authentication.service.impl";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationServiceImpl){
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser  = this.authenticationService.currentUserValue;
    if(currentUser){
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
