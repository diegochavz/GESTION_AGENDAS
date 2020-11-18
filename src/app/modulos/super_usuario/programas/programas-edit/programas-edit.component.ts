import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Docente from "../../../../core/models/docente.model";
import Programa from "../../../../core/models/programa.model";
import {ProgramaServiceImpl} from "../../../../core/http/implement/programa.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-programas-edit',
  templateUrl: './programas-edit.component.html',
  styleUrls: ['./programas-edit.component.scss']
})
export class ProgramasEditComponent implements OnInit {

  loading: boolean;

  formEditPrograma: FormGroup;

  listDocentes: Array<Docente>;

  programa: Programa;

  constructor(private programaService: ProgramaServiceImpl,
              private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<ProgramasEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.listDocentes = [];
    this.loading = false;
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
      this.docenteService.get(this.programa.director).subscribe((res: Docente) => {
        this.formEditPrograma.get('director').setValue(res);
        this.listarDocentes();
      })
    }
  }

  listarDocentes() {

  }

  salir(): void {
    this.dialogRef.close(false);
  }

  editarPrograma(): void {
    this.loading = false;
    let editPrograma = <Programa>Object.assign({}, this.formEditPrograma.value);
    editPrograma.id = this.programa.id;
    console.log(editPrograma)
    this.programaService.update(editPrograma.id,editPrograma).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
      },
      () => {
        this.loading = true;
      });
  }

}
