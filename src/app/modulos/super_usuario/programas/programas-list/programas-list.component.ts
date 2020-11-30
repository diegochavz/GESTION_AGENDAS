import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ValidateService} from "../../../../core/services/validators";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";

@Component({
  selector: 'app-programas-list',
  templateUrl: './programas-list.component.html',
  styleUrls: ['./programas-list.component.scss']
})
export class ProgramasListComponent implements OnInit, AfterViewInit {

  //columnas de la tabla
  displayedColumns: string[] = ['codigo_programa', 'nombre_programa', 'opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<Programa>;

  //Visualización barra de carga
  loading: boolean;

  programas: Array<Programa>;

  constructor(private  programaService: ProgramaServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validate: ValidateService,
              private authenticationService: AuthenticationServiceImpl) {
    this.validate.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
    this.loading = true;
    // Assign the data to the data source for the table to render
    this.programas = [];
    this.dataSource = new MatTableDataSource(this.programas);
  }

  ngOnInit(): void {
    this.getProgramas();
  }

  ngAfterViewInit() {

  }

  getProgramas() {
    this.loading = false;
    this.programas = [];
    this.programaService.getAll().subscribe(
      (listProgramas: Array<Programa>) => {
        this.programas = listProgramas;
        console.log(this.programas)
        this.dataSource = new MatTableDataSource(this.programas);
      },
      (error) => {
        console.log("ERROR -> LISTAR PROGRAMAS")
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

  eliminarPrograma(idPrograma: number) {
    console.log(idPrograma)
    this.dialogService.deleteProgramaDialog(idPrograma).subscribe(res => {
      this.getProgramas();
    });
  }

  agregarPrograma() {
    this.dialogService.addProgramaDialog().subscribe(res => {
      this.getProgramas();
    });
  }

  editarPrograma(programa: Programa) {
    this.dialogService.editProgramaDialog(programa).subscribe(res => {
      this.getProgramas();
    });
  }

}
