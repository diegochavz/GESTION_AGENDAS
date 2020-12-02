import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import RouteModel from "../../core/models/route.model";
import {AuthenticationServiceImpl} from "../../core/http/implement/authentication.service.impl";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  @Input() routes: RouteModel[];

  constructor(private router: Router,
              private  authenticationService: AuthenticationServiceImpl,) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  cerrarSesion(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
