import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../../../core/services/dialogs.service";
import {ToasterService} from "../../../../core/services/toaster.service";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";
import DirectorResponse from "../../../../core/models/director_response.model";
import {TIPO_USER} from "../../../../core/constants/tipo_user.constants";
import {ValidateUser} from "../../../../core/services/validate_usuario.service";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";

@Component({
  selector: 'app-directores-list',
  templateUrl: './directores-list.component.html',
  styleUrls: ['./directores-list.component.scss']
})
export class DirectoresListComponent implements OnInit {
  //columnas de la tabla
  displayedColumns: string[] = ['codigo_director','nombre', 'correo','opciones'];

  //Datos a exponer en la tabla
  dataSource: MatTableDataSource<DirectorResponse>;

  //Visualización barra de carga
  loading: boolean;

  directores: Array<DirectorResponse>;


  constructor(private  directorService: DirectorServiceImpl,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private validateUser: ValidateUser,
              private authenticationService: AuthenticationServiceImpl) {
    this.validateUser.validateTipoUser(authenticationService.currentUserValue.tipo_usuario,TIPO_USER.SUPER_USUARIO)
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
        this.directores = listDirectores;
        this.dataSource = new MatTableDataSource(this.directores);
      },
      (error) => {
        console.log("ERROR -> LISTAR DIRECTORES")
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

  eliminarDirector(idDirector: number) {
    this.dialogService.deleteDirectorDialog(idDirector).subscribe(res => {
      if (res == 1) {
        this.getDirectores();
        this.toasterService.openSnackBar(
          'Director eliminado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if(res==2){
        this.toasterService.openSnackBar(
          'ERROR AL ELIMINAR DOCENTE',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  agregarDirector() {
    this.dialogService.addDirectorDialog().subscribe(res => {
      if (res == 1) {
        this.getDirectores();
        this.toasterService.openSnackBar(
          'Director agregado Exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if(res==2){
        this.toasterService.openSnackBar(
          'ERROR AL CREAR DIRECTOR',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

  editarDirector(directorResponse: DirectorResponse) {
    this.dialogService.editDirectorDialog(directorResponse).subscribe(res => {
      if (res==1) {
        this.getDirectores();
        this.toasterService.openSnackBar(
          'Director editado exitosamente.',
          ToasterService.CERRAR_ACTION
        );
      } else if(res==2){
        this.toasterService.openSnackBar(
          'ERROR AL EDITAR DIRECTOR',
          ToasterService.CERRAR_ACTION
        );
      }
    });
  }

}
