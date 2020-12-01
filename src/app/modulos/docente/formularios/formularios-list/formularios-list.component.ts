import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";
import Formulario from "../../../../core/models/formulario.model";
import {IProgramaService} from "../../../../core/http/programa.service.interface";
import {DataFormularioService} from "../../../../core/services/data_formulario.service";
import {MatDialog} from "@angular/material/dialog";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import Horario from "../../../../core/models/horario.model";
import Pregunta from "../../../../core/models/pregunta.model";
import {FormulariosDeleteComponent} from "../formularios-delete/formularios-delete.component";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import Programa from "../../../../core/models/programa.model";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import * as moment from "moment";
import {ClipboardService} from "ngx-clipboard";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-formularios-list',
  templateUrl: './formularios-list.component.html',
  styleUrls: ['./formularios-list.component.scss']
})
export class FormulariosListComponent implements OnInit {

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  //columnas de la tabla
  displayedColumns: string[] = ['fecha_registro', 'nombre_formulario', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<Formulario>;

  //Visualización barra de carga
  loading: boolean;

  //Identificador docente provisional
  idDocente: number;

  formularios: Array<Formulario>;

  constructor(private formularioService: FormularioServiceImpl,
              private  programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dataFormularioService: DataFormularioService,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = true;
    // Assign the data to the data source for the table to render
    this.formularios = [];
    this.dataSource = new MatTableDataSource(this.formularios);
    this.getFormularios();
  }

  ngOnInit(): void {
    this.getFormularios();
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getFormularios() {
    this.loading = false;
    this.formularios = [];
    this.docenteService.getFormulariosByDocente(this.idDocente).subscribe(
      (listFormularios: Array<Formulario>) => {
        let aux = [];
        for (let i of listFormularios) {
          if (i.activo == 1) {
            aux.push(i)
          }
        }
        this.formularios = aux;
        this.dataSource = new MatTableDataSource(this.formularios);
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

  aplicarFormatoFecha(formulario: Formulario): string {
    return moment(formulario.fecha_registro).format("YYYY-MM-DD");
  }

  setFormulario(form: Formulario) {
    this.dataFormularioService.setDataFormulario(form);
  }

  eliminarFormulario(idFormulario: number) {
    this.dialogService.deleteFormularioDialog(idFormulario).subscribe(res => {
      this.getFormularios();
    });
  }
}
