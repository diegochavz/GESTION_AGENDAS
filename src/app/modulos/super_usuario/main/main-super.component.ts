import {Component, OnInit} from '@angular/core';
import {ValidateUser} from "../../../core/services/validate_usuario.service";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-main-super',
  templateUrl: './main-super.component.html',
})
export class MainSuperComponent implements OnInit {

  constructor(private validateUser: ValidateUser,
              private authenticationService: AuthenticationServiceImpl) {
    this.validateUser.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
  }

  ngOnInit() {

  }

}
