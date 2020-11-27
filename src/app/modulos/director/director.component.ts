import {Component, OnInit} from "@angular/core";
import RouteModel from "../../core/models/route.model";
import {ROUTES_CONST_DIRECTOR} from "../../core/constants/routes.constants";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
})
export class DirectorComponent implements OnInit {

  router: RouteModel[];

  constructor() {
    this.router = ROUTES_CONST_DIRECTOR;
  }

  ngOnInit(): void {
  }

}
