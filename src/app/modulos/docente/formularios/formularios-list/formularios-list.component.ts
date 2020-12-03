import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
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
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {FormularioTable} from "../../../../core/util/interface_tables/formulario_table.interface";
import {ConverterService} from "../../../../core/services/converters.service";

@Component({
  selector: 'app-formularios-list',
  templateUrl: './formularios-list.component.html',
  styleUrls: ['./formularios-list.component.scss']
})
export class FormulariosListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //columnas de la tabla
  displayedColumns: string[] = ['fecha_registro', 'nombre_formulario', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<FormularioTable>;

  //Visualización barra de carga
  loading: boolean;

  //Identificador docente provisional
  idDocente: number;

  formularios: Array<FormularioTable>;

  constructor(private formularioService: FormularioServiceImpl,
              private  programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              private dataFormularioService: DataFormularioService,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private router: Router,
              private converterService: ConverterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DOCENTE)
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.loading = true;
    // Assign the data to the data source for the table to render
    this.formularios = [];
    this.dataSource = new MatTableDataSource(this.formularios);
    this.getFormularios();
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if('/docente/listar-formularios' === event.url)
       this.getFormularios();
      }
    });
  }

  ngOnInit(): void {
    this.getFormularios();
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
        this.formularios =this.converterService.converterToTableFormularios(aux);

      },
      (error) => {
        this.toasterService.openSnackBarCumtom(error, 'error')
        this.loading = true;
      },
      () => {
        this.dataSource = new MatTableDataSource(this.formularios);
        this.setInitPaginatorAndSort()
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

  editarFormulario(idFormulario: number) {
    this.dataFormularioService.setDataFormulario(idFormulario);
  }

  eliminarFormulario(idFormulario: number) {
    this.dialogService.deleteFormularioDialog(idFormulario).subscribe(res => {
      this.getFormularios();
    });
  }
}
