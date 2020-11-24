import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import Estudiante from "../../../../core/models/estudiante.model";

@Component({
  selector: 'app-estudiantes-add',
  templateUrl: './estudiantes-add.component.html',
  styleUrls: ['./estudiantes-add.component.scss']
})
export class EstudiantesAddComponent implements OnInit {

  loading: boolean;

  formAddEstudiante: FormGroup;

//DATOS PROVICIONAL
  idPrograma = 1;
  idDocente = 2;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesAddComponent>,
              private _formBuilder: FormBuilder) {
    this.loading = true;
  }


  ngOnInit(): void {
    this.formAddEstudiante = this._formBuilder.group({
      codigo_estudiante: ['', [Validators.required]],
      nombre_estudiante: ['', [Validators.required]],
      correo_estudiante: ['', [Validators.required]],
    });
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  registrarEstudiante(): void {
    this.loading = false;
    let newEstudiante = <Estudiante>Object.assign({}, this.formAddEstudiante.value);
    newEstudiante.programa = this.idPrograma;
    newEstudiante.ids_docentes = [this.idDocente]
    newEstudiante.docentes = [this.idDocente]
    console.log(JSON.stringify(newEstudiante))
    this.estudianteService.save(newEstudiante).subscribe(
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
