import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../core/models/programa.model";
import DocenteResponse from "../../../core/models/docente_response.model";
import {ProgramaServiceImpl} from "../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToasterService} from "../../../core/services/toaster.service";
import {AuthenticationServiceImpl} from "../../../core/http/implement/authentication.service.impl";
import ProgramaResponse from "../../../core/models/programa_response.model";
import Usuario from "../../../core/models/usuario.model";
import DirectorResponse from "../../../core/models/director_response.model";
import {DirectorServiceImpl} from "../../../core/http/implement/director.service.impl";
import Director from "../../../core/models/director.model";

@Component({
  selector: 'app-perfil-director',
  templateUrl: './perfil-director.component.html',
  styleUrls: ['./perfil-director.component.scss']
})
export class PerfilDirectorComponent implements OnInit {

  loading: boolean;

  formEditDirector: FormGroup;

  director: DirectorResponse;

  listProgramas: Array<Programa>;

  constructor(private directorService: DirectorServiceImpl,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private docenteService: DocenteServiceImpl,
              private programaService: ProgramaServiceImpl,
              private authenticationService: AuthenticationServiceImpl) {
    this.loading = true;
    this.listProgramas = [];
  }

  ngOnInit(): void {
    this.getDirector();
    this.crearForm();
  }

  crearForm(){
    this.formEditDirector = this._formBuilder.group({
      codigo_director: ['', [Validators.required]],
      nombre: ['',[Validators.required]],
      programa: [{value: '', disabled: true}, [Validators.required]],
      correo: ['',[Validators.required]],
    });

    this.programaService.getAll().subscribe((res: Array<Programa>) => {
      this.listProgramas = res;
    }, (error)=>{
      this.toasterService.openSnackBarCumtom(
        error,
        'error')

    })
  }

  getDirector(){
    this.loading = false;
    this.directorService.get(this.authenticationService.currentUserValue.user_id).subscribe(res =>{
      this.director = res;
    }, (error) =>{
      this.toasterService.openSnackBarCumtom(
        error,
        'error'
      )
    },()=>{
      this.cargarDatosDirector();
      this.loading = true;
    })
  }

  cargarDatosDirector(){
    this.formEditDirector.get('codigo_director').setValue(this.director.codigo_director)
    this.formEditDirector.get('nombre').setValue(this.director.usuario.nombre)
    this.formEditDirector.get('programa').setValue(this.director.programas_data[0].id)
    this.formEditDirector.get('correo').setValue(this.director.usuario.correo)
  }

  editarDirector(): void {
    this.loading = false;
    let directorAux = new Director();
    directorAux.nombre = this.formEditDirector.value.nombre
    directorAux.codigo_director = this.formEditDirector.value.codigo_director
    directorAux.correo = this.formEditDirector.value.correo
    console.log(this.formEditDirector.getRawValue().programa);
    directorAux.programa = this.formEditDirector.getRawValue().programa
    console.log(directorAux)
    this.directorService.update(this.director.usuario.id, directorAux).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Director actualizado satisfactoriamente',
          'success'
        )
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error'
        )
      },
      () => {
        this.loading = true;
      });
  }

}
