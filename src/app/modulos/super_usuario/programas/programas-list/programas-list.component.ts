import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {ValidateUser} from "../../../../core/services/validate_usuario.service";
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
              private validateUser: ValidateUser,
              private authenticationService: AuthenticationServiceImpl) {
    this.validateUser.validateTipoUser(authenticationService.currentUserValue.tipo_usuario, TIPO_USER.SUPER_USUARIO)
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
      if (res == 1) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa eliminado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if (res == 2) {
        this.toasterService.openSnackBar(
          'ERROR AL ELIMINAR PROGRAMA',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  agregarPrograma() {
    this.dialogService.addProgramaDialog().subscribe(res => {
      if (res == 1) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa agregado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if (res == 2) {
        this.toasterService.openSnackBar(
          'ERROR AL AGREGAR PROGRAMA',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  editarPrograma(programa: Programa) {
    this.dialogService.editProgramaDialog(programa).subscribe(res => {
      if (res == 1) {
        this.getProgramas();
        this.toasterService.openSnackBar(
          'Programa editado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if (res == 2) {
        this.toasterService.openSnackBar(
          'ERROR AL BORRAR PROGRAMA',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
