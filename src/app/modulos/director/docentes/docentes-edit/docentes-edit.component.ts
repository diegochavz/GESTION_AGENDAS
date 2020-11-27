import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Docente from "../../../../core/models/docente.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import DocenteResponse from "../../../../core/models/docente_response.model";
import Usuario from "../../../../core/models/usuario.model";
import FormularioResponse from "../../../../core/models/formulario_response.model";

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

  listProgramasUso: number[];

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<DocentesEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.listProgramas = [];
    this.loading = true;
    this.docente = data.docenteResponse;
    this.listProgramasUso = [];
  }

  ngOnInit(): void {
    this.cargaDatosDocente();
  }

  cargaDatosDocente() {
    if (this.docente != null && this.docente != undefined) {
      this.formEditDocente = this._formBuilder.group({
        codigo_docente: [this.docente.codigo_docente, [Validators.required]],
        nombre: [this.docente.usuario.nombre, [Validators.required]],
        programas: [null, [Validators.required]],
        correo: [this.docente.usuario.correo, [Validators.required]],
      });
      this.programaService.getAll().subscribe((res: Array<Programa>) => {
        this.listProgramas = res;
        this.consultarProgramas();
      })
    }
  }

  consultarProgramas() {
    if (this.docente != null && this.docente != undefined) {
      const aux = new Array<number>();
      this.loading = false;
      this.docenteService.getProgramasByDocente(this.docente.usuario.id).subscribe((res: Array<Programa>) => {
          for (let i of res) {
            console.log("docente -> "+ i.id)
            aux.push(i.id);
          }
          this.formEditDocente.get('programas').setValue(aux)
          this.consultarProgramasEnUso(aux);
        },
        () => {
        },
        () => {

          this.loading = true;
        }
      )
    }
  }

  consultarProgramasEnUso(listIDs: number[]) {
    if (listIDs.length != 0) {
      for (let i = 0; i < listIDs.length; i++) {
        this.programaService.getFormulariosByPrograma(listIDs[i]).subscribe((res: FormularioResponse[]) => {
          if (res.length > 0) {
            console.log("uso -> "+ listIDs[i])
            this.listProgramasUso.push(listIDs[i])
          }
        })
      }
    }
  }

  salir(): void {
    this.dialogRef.close(0);
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
    console.log(JSON.stringify(editDocente))
    this.docenteService.update(editDocente.usuario.id, editDocente).subscribe(
      () => {
        this.dialogRef.close(1);
      },
      (error) => {
        this.dialogRef.close(2);
      },
      () => {
        this.loading = true;
      });
  }

}
