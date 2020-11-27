import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import DirectorResponse from "../../../../core/models/director_response.model";
import {DirectorServiceImpl} from "../../../../core/http/implement/director.service.impl";

@Component({
  selector: 'app-programas-edit',
  templateUrl: './programas-edit.component.html',
  styleUrls: ['./programas-edit.component.scss']
})
export class ProgramasEditComponent implements OnInit {

  loading: boolean;

  formEditPrograma: FormGroup;

  listDirectores: Array<DirectorResponse>;

  programa: Programa;

  constructor(private programaService: ProgramaServiceImpl,
              private directorService: DirectorServiceImpl,
              public dialogRef: MatDialogRef<ProgramasEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.listDirectores = [];
    this.loading = true;
    this.programa = data.programa;
  }

  ngOnInit(): void {
    this.cargaDatosPrograma();
  }

  cargaDatosPrograma() {
    if (this.programa != null && this.programa != undefined) {
      this.formEditPrograma = this._formBuilder.group({
        codigo_programa: [this.programa.codigo_programa, [Validators.required]],
        nombre_programa: [this.programa.nombre_programa, [Validators.required]],
        director: [null, [Validators.required]]
      });
      this.loading = false;
      this.directorService.get(this.programa.director).subscribe((res: DirectorResponse) => {
        this.formEditPrograma.get('director').setValue(res.usuario.id);
        this.listarDirectores();
        this.loading = true;
      })
    }
  }

  listarDirectores() {
    this.listDirectores = [];
    this.directorService.getAll().subscribe((res: Array<DirectorResponse>)=>{
      this.listDirectores = res;
    })
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  editarPrograma(): void {
    this.loading = false;
    let editPrograma = <Programa>Object.assign({}, this.formEditPrograma.value);
    editPrograma.id = this.programa.id;
    this.programaService.update(editPrograma.id,editPrograma).subscribe(
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
