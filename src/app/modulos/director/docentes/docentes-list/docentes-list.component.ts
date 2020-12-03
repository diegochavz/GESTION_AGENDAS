import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import DocenteResponse from "../../../../core/models/docente_response.model";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {ValidateService} from "../../../../core/services/validators";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import Director from "../../../../core/models/director.model";
import Docente from "../../../../core/models/docente.model";
import {DocenteTable} from "../../../../core/util/interface_tables/docente_table.interface";
import {MatPaginator} from "@angular/material/paginator";
import {ConverterService} from "../../../../core/services/converters.service";

@Component({
  selector: 'app-docentes-list',
  templateUrl: './docentes-list.component.html',
  styleUrls: ['./docentes-list.component.scss']
})
export class DocentesListComponent implements OnInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_docente', 'nombre', 'correo', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<DocenteTable>;

  //Visualización barra de carga
  loading: boolean;

  docentes: Array<DocenteTable>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private  docenteService: DocenteServiceImpl,
              private programaService: ProgramaServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private authenticationService: AuthenticationServiceImpl,
              private validate: ValidateService,
              private converterService: ConverterService) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.DIRECTOR)
    this.loading = true;
    this.docentes = [];
    this.dataSource = new MatTableDataSource(this.docentes);

  }


  ngOnInit(): void {
    this.getDocentes();
  }

  getDocentes() {
    this.loading = false;
    this.docentes = [];
    this.programaService.getDocentesByPrograma(this.authenticationService.currentUserValue.programas[0].id).subscribe(
      (listDocentes: DocenteResponse[]) => {
        let aux = []
        for (let i of listDocentes) {
          if (i.usuario.id != this.authenticationService.currentUserValue.user_id) {
            aux.push(i);
          }
        }
        this.docentes = this.converterService.converterToTableDocentes(aux);
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(error, 'error')
        this.loading = true;

      },
      () => {
        this.dataSource = new MatTableDataSource(this.docentes);
        this.setInitPaginatorAndSort();
        this.loading = true;
      });
  }

  setInitPaginatorAndSort() {
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

  eliminarDocente(idDocente: number) {
    this.dialogService.deleteDocenteDialog(idDocente).subscribe(res => {
      this.getDocentes();
    });
  }

  loadDataDocente() {
    this.dialogService.loadDataDocenteDialog().subscribe(res => {
      this.getDocentes();
    });
  }

  agregarDocente() {
    this.dialogService.addDocenteDialog().subscribe(res => {
      this.getDocentes();
    });
  }

  editarDocente(idDocente: number) {
    this.dialogService.editDocenteDialog(idDocente).subscribe(res => {
      this.getDocentes();
    });
  }

}
