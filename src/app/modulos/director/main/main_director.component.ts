import {Component, OnInit} from "@angular/core";
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-main-director',
  templateUrl: './main_director.component.html',
})
export class MainDirectorComponent implements OnInit {

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DIRECTOR)
  }

  ngOnInit() {

  }

}
