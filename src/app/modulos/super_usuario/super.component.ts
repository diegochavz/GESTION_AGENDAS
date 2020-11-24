import { Component, OnInit } from '@angular/core';
import {ROUTES_CONST_SUPER} from "../../core/constants/routes.constants";
import RouteModel from "../../core/models/route.model";

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
})
export class SuperComponent implements OnInit {

  router: RouteModel[];

  constructor() {
    this.router = ROUTES_CONST_SUPER;
  }

  ngOnInit(): void {
  }

}
