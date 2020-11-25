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
    this.loading = true;
    this.estudiante = data.estudiante;
  }

  ngOnInit(): void {
    this.cargaDatosEstudiante();
  }

  cargaDatosEstudiante() {
    if (this.estudiante != null && this.estudiante != undefined) {
      this.formEditEstudiante = this._formBuilder.group({
        codigo_estudiante: [this.estudiante.codigo_estudiante, [Validators.required]],
        nombre_estudiante: [this.estudiante.nombre_estudiante, [Validators.required]],
        correo_estudiante: [this.estudiante.correo_estudiante, [Validators.required]],
      });
    }
  }


  salir(): void {
    this.dialogRef.close(0);
  }

  editarEstudiante(): void {
    this.loading = false;

    this.estudiante.codigo_estudiante = this.formEditEstudiante.value.codigo_estudiante;
    this.estudiante.nombre_estudiante = this.formEditEstudiante.value.nombre_estudiante;
    this.estudiante.correo_estudiante = this.formEditEstudiante.value.correo_estudiante;
    this.estudiante.docentes = this.estudiante.ids_docentes;
    console.log(JSON.stringify(this.estudiante))
    this.estudianteService.update( this.estudiante.id, this.estudiante).subscribe(
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
