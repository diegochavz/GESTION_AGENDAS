import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import SolicitudResponse from "../../../../core/models/solicitud_response.model";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import SolicitudEstudiante from "../../../../core/models/solicitud_estudiante.model";

@Component({
  selector: 'app-autorizaciones-list',
  templateUrl: './autorizaciones-list.component.html',
  styleUrls: ['./autorizaciones-list.component.scss']
})
export class AutorizacionesListComponent implements OnInit {

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
          if(sol.estado == 1){
            aux.push(sol)
          }
        }
        console.log(aux)
        this.solicitudes = aux;
        this.dataSource = new MatTableDataSource(this.solicitudes);
      },
      (error) => {
        console.log("ERROR -> LISTAR SOLICITUDES")
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

  eliminarAutorizacion(idSolicitud: number) {
    this.dialogService.deleteAutorizacionDialog(idSolicitud).subscribe(res => {
      if (res == 1) {
        this.getSolicitudes();
        this.toasterService.openSnackBar(
          'AUTORIZACIÓN NO APROBADA',
          ToasterService.CERRAR_ACTION
        );
      } else if (res == 2) {
        this.toasterService.openSnackBar(
          'ERROR AL DESAPROBAR LA AUTORIZACIÓN',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  verAutorizacion(idSolicitud: number) {
    this.dialogService.showAutorizacionDialog(idSolicitud).subscribe(res => {
    });
  }

  aprobarAutorizacion(idSolicitud: number) {
    this.dialogService.approveAutorizacionDialog(idSolicitud).subscribe(res => {
      if (res == 1) {
        this.getSolicitudes();
        this.toasterService.openSnackBar(
          'AUTORIZACIÓN APROBADA',
          ToasterService.CERRAR_ACTION
        );
      } else if (res == 2) {
        this.toasterService.openSnackBar(
          'ERROR AL APROBAR LA AUTORIZACIÓN',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
