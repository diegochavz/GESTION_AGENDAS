import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Estudiante from "../../../../core/models/estudiante.model";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";

@Component({
  selector: 'app-estudiantes-list',
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_estudiante','nombre_estudiante','correo_estudiante', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<Estudiante>;

  //Visualización barra de carga
  loading: boolean;

  estudiantes: Array<Estudiante>;

  constructor(private  estudianteService: EstudianteServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService) {
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
    //Este método debe ser estudiantes por progama
    this.estudianteService.getAll().subscribe(
      (listEstudiantes: Array<Estudiante>) => {
        this.estudiantes = listEstudiantes;
        this.dataSource = new MatTableDataSource(this.estudiantes);
      },
      (error) => {
        console.log("ERROR -> LISTAR ESTUDIANTES")
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
      if (res) {
        this.getEstudiantes();
        this.toasterService.openSnackBar(
          'Estudiante eliminado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  agregarEstudiante() {
    this.dialogService.addEstudianteDialog().subscribe(res => {
      if (res) {
        this.getEstudiantes();
        this.toasterService.openSnackBar(
          'Estudiante agregado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  editarEstudiante(estudiante: Estudiante) {
    this.dialogService.editEstudianteDialog(estudiante).subscribe(res => {
      if (res) {
        this.getEstudiantes();
        this.toasterService.openSnackBar(
          'Estudiante editado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
