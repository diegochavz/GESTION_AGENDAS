import { Component, OnInit, ViewChild } from '@angular/core';
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
import {EstudianteTable} from "../../../../core/util/interface_tables/estudiante_table.interface";
import {ConverterService} from "../../../../core/services/converters.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-estudiantes-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit{

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_estudiante','nombre_estudiante','correo_estudiante', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<EstudianteTable>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Visualización barra de carga
  loading: boolean;

  estudiantes: Array<EstudianteTable>;

  idDocente :number;

  constructor(private  estudianteService: EstudianteServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private converterService: ConverterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = true;
    this.estudiantes = [];
    this.dataSource = new MatTableDataSource(this.estudiantes);
  }

  ngOnInit():void {
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.loading = false;
    this.estudiantes = [];
    this.docenteService.getEstudiantesByDocente(this.idDocente).subscribe(
      (listEstudiantes: Array<EstudianteRequest>) => {
        this.estudiantes = this.converterService.converterToTableEstudiantes(listEstudiantes);
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')

      },
      () => {
        this.dataSource = new MatTableDataSource(this.estudiantes);
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

  editarEstudiante(idEstudiante: number) {
    this.dialogService.editEstudianteDialog(idEstudiante).subscribe(res => {
      this.getEstudiantes();
    });
  }

  loadDataEstudiante(){
    this.dialogService.loadDataEstudianteDialog().subscribe(res => {
      this.getEstudiantes();
    });
  }
}
