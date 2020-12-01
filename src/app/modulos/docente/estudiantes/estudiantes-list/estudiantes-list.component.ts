import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Estudiante from "../../../../core/models/estudiante.model";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import EstudianteRequest from "../../../../core/models/estudiante_request.model";

@Component({
  selector: 'app-estudiantes-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_estudiante','nombre_estudiante','correo_estudiante', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<EstudianteRequest>;

  //Visualización barra de carga
  loading: boolean;

  estudiantes: Array<EstudianteRequest>;

  idDocente :number;

  constructor(private  estudianteService: EstudianteServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = true;
    this.estudiantes = [];
    this.dataSource = new MatTableDataSource(this.estudiantes);
  }

  ngOnInit():void {
    this.getEstudiantes();
  }

  ngAfterViewInit() {

  }

  getEstudiantes() {
    this.loading = false;
    this.estudiantes = [];
    this.docenteService.getEstudiantesByDocente(this.idDocente).subscribe(
      (listEstudiantes: Array<EstudianteRequest>) => {
        this.estudiantes = listEstudiantes;
        this.dataSource = new MatTableDataSource(this.estudiantes);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarEstudiante(idEstudiante: number) {
    this.dialogService.deleteEstudianteDialog(idEstudiante).subscribe(res => {
      this.getEstudiantes();
    });
  }

  agregarEstudiante() {
    this.dialogService.addEstudianteDialog().subscribe(res => {
      this.getEstudiantes();
    });
  }

  editarEstudiante(estudiante: EstudianteRequest) {
    this.dialogService.editEstudianteDialog(estudiante).subscribe(res => {
      this.getEstudiantes();
    });
  }

  loadDataEstudiante(){
    this.dialogService.loadDataEstudianteDialog().subscribe(res => {
      this.getEstudiantes();
    });
  }
}
