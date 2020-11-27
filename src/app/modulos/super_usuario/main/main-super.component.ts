import {Component, OnInit} from '@angular/core';
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-main-super',
  templateUrl: './main-super.component.html',
})
export class MainSuperComponent implements OnInit {

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
  }

  ngOnInit() {

  }

}
