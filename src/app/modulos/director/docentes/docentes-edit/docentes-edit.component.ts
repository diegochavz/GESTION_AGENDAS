import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import DocenteResponse from "../../../../core/models/docente_response.model";
import Usuario from "../../../../core/models/usuario.model";
import ProgramaResponse from "../../../../core/models/programa_response.model";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-docentes-edit',
  templateUrl: './docentes-edit.component.html',
  styleUrls: ['./docentes-edit.component.scss']
})
export class DocentesEditComponent implements OnInit {

  loading: boolean;

  formEditDocente: FormGroup;

  listProgramas: Array<Programa>;

  docente: DocenteResponse;

  idDocente:number;

  listProgramasUso: number[];

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<DocentesEditComponent>,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.listProgramas = [];
    this.loading = true;
    this.idDocente = data.idDocente;
    this.listProgramasUso = [];
  }

  ngOnInit(): void {
    this.formEditDocente = this._formBuilder.group({
      codigo_docente: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      programas: [null, [Validators.required]],
      correo: ['', [Validators.required]],
    });
    this.getDocente();
    this.getProgramas();
  }

  getProgramas(){
    this.loading = false;
    this.programaService.getAll().subscribe((res: Array<Programa>) => {
      this.listProgramas = res;
    }, (error)=>{
      this.toasterService.openSnackBarCumtom(error, 'error')
      this.loading = true;
    },()=>{
      this.loading = true;
    })
  }

  getDocente(){
    this.loading = false;
    this.docenteService.get(this.idDocente).subscribe((res:DocenteResponse)=>{
      this.docente = res;
    },error =>{
      this.toasterService.openSnackBarCumtom(error,'error');
      this.loading = true;
    },()=>{
      this.loading = true;
      this.cargaDatosDocente();
    })
  }

  cargaDatosDocente() {
      this.formEditDocente.get('codigo_docente').setValue(this.docente.codigo_docente)
      this.formEditDocente.get('nombre').setValue(this.docente.usuario.nombre)
      this.formEditDocente.get('correo').setValue(this.docente.usuario.correo)
      this.consultarProgramasDocente();
  }

  consultarProgramasDocente() {
      const aux = new Array<number>();
      this.loading = false;
      this.docenteService.getProgramasNormalByDocente(this.docente.usuario.id).subscribe((res: Array<ProgramaResponse>) => {
        for (let i of res) {
            aux.push(i.programa);
            if(i.esta_vinculado == true){
              //marcar programas del docente en uso por formularios
              this.listProgramasUso.push(i.programa)
            }
          }
        //marcar programas del docente
          this.formEditDocente.get('programas').setValue(aux)
        },
        (error) => {
          this.toasterService.openSnackBarCumtom(error,'error')
          this.loading = true;
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
    editUsuario.id = this.docente.usuario.id;
    editDocente.usuario = editUsuario;
    editDocente.codigo_docente = this.formEditDocente.value.codigo_docente + '';
    editDocente.usuario.nombre = this.formEditDocente.value.nombre;
    editDocente.nombre = this.formEditDocente.value.nombre;
    editDocente.usuario.correo = this.formEditDocente.value.correo + '';
    editDocente.correo = this.formEditDocente.value.correo + '';
    editDocente.programas = this.formEditDocente.value.programas;
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
        this.loading = true;
      },
      () => {
        this.loading = true;
      });
  }

}
