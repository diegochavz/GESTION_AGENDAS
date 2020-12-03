import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import SolicitudResponse from "../../../../core/models/solicitud_response.model";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import SolicitudEstudiante from "../../../../core/models/solicitud_estudiante.model";
import {MatPaginator} from "@angular/material/paginator";
import {AutorizacionTable} from "../../../../core/util/interface_tables/autorizacion_table.interface";
import {ConverterService} from "../../../../core/services/converters.service";

@Component({
  selector: 'app-autorizaciones-list',
  templateUrl: './autorizaciones-list.component.html',
  styleUrls: ['./autorizaciones-list.component.scss']
})
export class AutorizacionesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //columnas de la tabla
  displayedColumns: string[] = ['fecha_asesoria', 'hora_inicio', 'hora_fin', 'estudiantes', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<AutorizacionTable>;

  //Visualización barra de carga
  loading: boolean;

  solicitudes: Array<AutorizacionTable>;

  //provicional
  idDocente : number ;


  constructor(private docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private converterService: ConverterService) {
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
        let aux = [];
        for(let sol of listsolitudes){
          if(sol.estado == 1){
            aux.push(sol)
          }
        }
        this.solicitudes = this.converterService.converterToTableAutorizaciones(aux);
      },
      (error) => {
      },
      () => {
        this.dataSource = new MatTableDataSource(this.solicitudes);
        this.setInitPaginatorAndSort();
        this.loading = true;
      });
  }

  setInitPaginatorAndSort(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = ' Filas por página';
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
      this.getSolicitudes();
    });
  }

  verAutorizacion(idSolicitud: number) {
    this.dialogService.showAutorizacionDialog(idSolicitud).subscribe(res => {
    });
  }

  aprobarAutorizacion(idSolicitud: number) {
    this.dialogService.approveAutorizacionDialog(idSolicitud).subscribe(res => {
      this.getSolicitudes();
    });
  }

}
