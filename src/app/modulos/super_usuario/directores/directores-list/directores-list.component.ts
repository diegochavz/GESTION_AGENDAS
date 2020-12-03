import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {MatPaginator} from "@angular/material/paginator";
import {DirectorTable} from "../../../../core/util/interface_tables/director_table.interface";
import {ConverterService} from "../../../../core/services/converters.service";

@Component({
  selector: 'app-directores-list',
  templateUrl: './directores-list.component.html',
  styleUrls: ['./directores-list.component.scss']
})
export class DirectoresListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_director','nombre', 'correo','opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<DirectorTable>;

  //Visualización barra de carga
  loading: boolean;

  directores: Array<DirectorTable>;


  constructor(private  directorService: DirectorServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl,
              private converterService: ConverterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario,TIPO_USER.SUPER_USUARIO)
    this.loading = true;
    this.directores = [];
    this.dataSource = new MatTableDataSource(this.directores);

  }

  ngOnInit():void {
    this.getDirectores();
  }

  ngAfterViewInit() {

  }

  getDirectores() {
    this.loading = false;
    this.directores = [];
    this.directorService.getAll().subscribe(
      (listDirectores: Array<DirectorResponse>) => {
        this.directores = this.converterService.converterToTableDirector(listDirectores);
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(error,'error')
        this.loading = true;
      },
      () => {
        this.dataSource = new MatTableDataSource(this.directores);
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

  eliminarDirector(idDirector: number) {
    this.dialogService.deleteDirectorDialog(idDirector).subscribe(res => {
      this.getDirectores();
    });
  }

  agregarDirector() {
    this.dialogService.addDirectorDialog().subscribe(res => {
      this.getDirectores();
    });
  }

  editarDirector(idDirector: number) {
    this.dialogService.editDirectorDialog(idDirector).subscribe(res => {
      this.getDirectores();
    });
  }

}
