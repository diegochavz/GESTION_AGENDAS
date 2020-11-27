import { Component, OnInit } from '@angular/core';
import RouteModel from "../../core/models/route.model";
import {ROUTES_CONST_DOCENTE} from "../../core/constants/routes.constants";

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
})
export class DocenteComponent implements OnInit {

  router: RouteModel[];

  constructor() {
    this.router = ROUTES_CONST_DOCENTE;
  }

  ngOnInit(): void {
  }

}
