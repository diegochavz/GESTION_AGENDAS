import {Component, OnInit} from "@angular/core";
import {ValidateService} from "../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../core/constants/tipo_user.constants";
import DocenteResponse from "../../../core/models/docente_response.model";
import {MatTableDataSource} from "@angular/material/table";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";
import {ToasterService} from "../../../core/services/toaster.service";

@Component({
  selector: 'app-main-director',
  templateUrl: './main_director.component.html',
})
export class MainDirectorComponent implements OnInit {

  docentes: number;

  constructor(private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private programaService: ProgramaServiceImpl,
              private toasterService: ToasterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DIRECTOR)
    this.docentes = 0;
  }

  ngOnInit() {
    this.getDocentes();
  }

  getDocentes() {
    this.programaService.getDocentesByPrograma(this.authenticationService.currentUserValue.programas[0].id).subscribe(
      (listDocentes: DocenteResponse[]) => {
        let aux = []
        for (let i of listDocentes) {
          if (i.usuario.id != this.authenticationService.currentUserValue.user_id) {
            aux.push(i);
          }
        }
        this.docentes = aux.length;
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
      },
      () => {
      });
  }

}
