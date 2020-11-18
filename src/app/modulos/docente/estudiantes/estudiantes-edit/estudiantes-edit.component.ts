import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Estudiante from "../../../../core/models/estudiante.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";

@Component({
  selector: 'app-estudiantes-edit',
  templateUrl: './estudiantes-edit.component.html',
  styleUrls: ['./estudiantes-edit.component.scss']
})
export class EstudiantesEditComponent implements OnInit {

  loading: boolean;

  formEditEstudiante: FormGroup;

  estudiante: Estudiante;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.estudiante = data.estudiante;
  }

  ngOnInit(): void {
    this.cargaDatosEstudiante();
  }

  cargaDatosEstudiante() {
    if (this.estudiante != null && this.estudiante != undefined) {
      this.formEditEstudiante = this._formBuilder.group({
        codigo_programa: [this.estudiante.nombre, [Validators.required]],
        nombre_programa: [this.estudiante.codigo, [Validators.required]],
        director: [null, [Validators.required]]
      });
    }
  }


  salir(): void {
    this.dialogRef.close(false);
  }

  editarEstudiante(): void {
    this.loading = false;
    let editEstudiante = <Estudiante>Object.assign({}, this.formEditEstudiante.value);
    editEstudiante.id = this.estudiante.id;
    console.log(editEstudiante)
    this.estudianteService.update(editEstudiante.id,editEstudiante).subscribe(
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
