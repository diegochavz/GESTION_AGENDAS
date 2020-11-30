import {Component, OnInit} from '@angular/core';
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";
import Programa from "../../../core/models/programa.model";
import {DirectorServiceImpl} from "../../../core/http/implement/director.service.impl";
import Director from "../../../core/models/director.model";

@Component({
  selector: 'app-main-super',
  templateUrl: './main-super.component.html',
})
export class MainSuperComponent implements OnInit {

  cuentaProgramas:  number;
  cuentaDirectores: number;

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private programaService: ProgramaServiceImpl,
              private directorService: DirectorServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
    this.cuentaProgramas = 0;
    this.cuentaDirectores = 0;
  }

  ngOnInit() {
    this.getProgramas();
    this.getDirectores();
  }

  getProgramas() {
    this.programaService.getAll().subscribe(
      (listProgramas: Array<Programa>) => {
        this.cuentaProgramas = listProgramas.length;
      },
      (error) => {
        console.log("ERROR -> LISTAR PROGRAMAS")
      },
      () => {
      });
  }

  getDirectores() {
    this.directorService.getAll().subscribe(
      (listDirectores: Array<Director>) => {
        this.cuentaDirectores = listDirectores.length;
      },
      (error) => {
        console.log("ERROR -> LISTAR DIRECTORES")
      },
      () => {
      });
  }

}
