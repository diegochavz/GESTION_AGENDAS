import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/principal', title: 'principal',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/principal', title: 'dosss',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/principal', title: 'tress',  icon: 'ni-tv-2 text-primary', class: '' },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  nombre:string
  constructor(location: Location,
              private element: ElementRef,
              private router: Router,
              private  authenticationService: AuthenticationServiceImpl,) {
    this.location = location;
    this.nombre = this.authenticationService.currentUserValue.nombre;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
      if(this.listTitles[item].path === titlee){
        return this.listTitles[item].title;
      }
    }
    return 'Principal';
  }

  cerrarSesion(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
