import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import {MatPaginator} from "@angular/material/paginator";
import {ProgramaTable} from "../../../../core/util/interface_tables/programa_table.interface";
import {ConverterService} from "../../../../core/services/converters.service";

@Component({
  selector: 'app-programas-list',
  templateUrl: './programas-list.component.html',
  styleUrls: ['./programas-list.component.scss']
})
export class ProgramasListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_programa', 'nombre_programa', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<ProgramaTable>;

  //Visualización barra de carga
  loading: boolean;

  programas: Array<ProgramaTable>;

  constructor(private  programaService: ProgramaServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private converterService: ConverterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
    this.loading = true;
    // Assign the data to the data source for the table to render
    this.programas = [];
    this.dataSource = new MatTableDataSource(this.programas);
  }

  ngOnInit(): void {
    this.getProgramas();
  }

  getProgramas() {
    this.loading = false;
    this.programas = [];
    this.programaService.getAll().subscribe(
      (listProgramas: Array<Programa>) => {
        this.programas = this.converterService.converterToTablePrograma(listProgramas);
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(error,'error')
        this.loading = true;
      },
      () => {
        this.dataSource = new MatTableDataSource(this.programas);
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

  eliminarPrograma(idPrograma: number) {
    this.dialogService.deleteProgramaDialog(idPrograma).subscribe(res => {
      this.getProgramas();
    });
  }

  agregarPrograma() {
    this.dialogService.addProgramaDialog().subscribe(res => {
      this.getProgramas();
    });
  }

  loadDataPrograma(){
    this.dialogService.loadDataProgramaDialog().subscribe(res => {
      this.getProgramas();
    });
  }

  editarPrograma(idPrograma: number) {
    this.dialogService.editProgramaDialog(idPrograma).subscribe(res => {
      this.getProgramas();
    });
  }

}
