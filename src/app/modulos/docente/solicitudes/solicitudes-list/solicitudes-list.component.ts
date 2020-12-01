import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import SolicitudResponse from "../../../../core/models/solicitud_response.model";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import SolicitudEstudiante from "../../../../core/models/solicitud_estudiante.model";
import Docente from "../../../../core/models/docente.model";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ClipboardService} from "ngx-clipboard";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {

  //columnas de la tabla
  displayedColumns: string[] = ['fecha_asesoria', 'hora_inicio', 'hora_fin', 'estudiantes', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<SolicitudResponse>;

  //Visualización barra de carga
  loading: boolean;

  solicitudes: Array<SolicitudResponse>;

  //provicional
  idDocente : number ;

  constructor(private docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.idDocente = this.authenticationService.currentUserValue.user_id;
    this.loading = true;
    this.solicitudes = [];
    this.dataSource = new MatTableDataSource(this.solicitudes);
  }

  ngOnInit(): void {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.loading = false;
    this.solicitudes = [];
    this.docenteService.getSolicitudesByDocente(this.idDocente).subscribe(
      (listsolitudes: Array<SolicitudResponse>) => {
        console.log(listsolitudes)
        let aux = [];
        for(let sol of listsolitudes){
          if(sol.estado == 2){
            aux.push(sol)
          }
        }
        this.solicitudes = aux;
        this.dataSource = new MatTableDataSource(this.solicitudes);
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
      },
      () => {
        this.loading = true;
      });
  }

  estudiantesAsesoria(estudiantes_data: SolicitudEstudiante[]) {
    let estudiantesAux = '';

    if(estudiantes_data.length>=0){
      estudiantesAux = estudiantes_data[0].nombre_estudiante + "...";
    }
    return estudiantesAux;
  }

  formatHora(hora: string): string {
    return hora.split(':')[0] + ":" + hora.split(':')[1];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarSolicitud(idSolicitud: number) {
    this.dialogService.deleteSolicitudDialog(idSolicitud).subscribe(res => {
      this.getSolicitudes();
    });
  }

  verSolicitud(solicitudResponser: SolicitudResponse) {
    this.dialogService.showSolicitudDialog(solicitudResponser.id).subscribe(res => {
    });
  }
}
