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

@Component({
  selector: 'app-perfil-director',
  templateUrl: './perfil-director.component.html',
  styleUrls: ['./perfil-director.component.scss']
})
export class PerfilDirectorComponent implements OnInit {

  loading: boolean;

  formEditDocente: FormGroup;

  listProgramas: Array<Programa>;

  docente: DocenteResponse;

  listProgramasUso: number[];

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<PerfilDirectorComponent>,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService,
              private authenticationService: AuthenticationServiceImpl) {
    this.listProgramas = [];
    this.loading = true;
    this.listProgramasUso = [];
  }

  ngOnInit(): void {
    this.getDocente();
    this.crearForm();
  }
  crearForm(){
    this.formEditDocente = this._formBuilder.group({
      codigo_docente: ['', [Validators.required]],
      nombre: ['',[Validators.required]],
      programas: [null, [Validators.required]],
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

  getDocente(){
    this.loading = false;
    this.docenteService.get(this.authenticationService.currentUserValue.user_id).subscribe(res =>{
      this.docente= res;
    }, (error) =>{
      this.toasterService.openSnackBarCumtom(
        error,
        'error'
      )
    },()=>{
      this.cargarDatosDocente();
      this.consultarProgramas();
      this.loading = true;
    })
  }

  cargarDatosDocente(){
    this.formEditDocente.get('codigo_docente').setValue(this.docente.usuario.id)
    this.formEditDocente.get('nombre').setValue(this.docente.usuario.nombre)
    this.formEditDocente.get('programas').setValue(null)
    this.formEditDocente.get('correo').setValue(this.docente.usuario.correo)

  }

  consultarProgramas() {
      const aux = new Array<number>();
      this.loading = false;
      this.docenteService.getProgramasNormalByDocente(this.authenticationService.currentUserValue.user_id).subscribe((res: Array<ProgramaResponse>) => {
          for (let i of res) {
            aux.push(i.programa);
            if(i.esta_vinculado == true){
              this.listProgramasUso.push(i.programa)
            }
          }
          this.formEditDocente.get('programas').setValue(aux)
        },
        (error) => {
          this.toasterService.openSnackBarCumtom(
            error,
            'error')
        },
        () => {

          this.loading = true;
        }
      )
  }

  salir(): void {
    this.dialogRef.close();
  }

  editarDocente(): void {
    this.loading = false;
    let editDocente = new DocenteResponse();
    let editUsuario = new Usuario();
    editUsuario.id = this.authenticationService.currentUserValue.user_id;
    editDocente.usuario = editUsuario;
    editDocente.codigo_docente = this.formEditDocente.value.codigo_docente + '';
    editDocente.usuario.nombre = this.formEditDocente.value.nombre;
    editDocente.nombre = this.formEditDocente.value.nombre;
    editDocente.usuario.correo = this.formEditDocente.value.correo + '';
    editDocente.correo = this.formEditDocente.value.correo + '';
    editDocente.programas = this.formEditDocente.value.programas;
    console.log(JSON.stringify(editDocente))
    this.docenteService.update(editDocente.usuario.id, editDocente).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Docente actualizado satisfactoriamente',
          'success')

        this.dialogRef.close();
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
        this.dialogRef.close();
      },
      () => {
        this.loading = true;
      });
  }

}
