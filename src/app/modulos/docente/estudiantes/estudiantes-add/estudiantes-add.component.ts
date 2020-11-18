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

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesAddComponent>,
              private _formBuilder: FormBuilder,) {
    this.loading = false;
  }


  ngOnInit(): void {
    this.formAddEstudiante = this._formBuilder.group({
      codigo_estudiante: ['', [Validators.required]],
      nombre_estudiante: ['', [Validators.required]],
      correo: [null, [Validators.required]],
    });
  }

  salir(): void {
    this.dialogRef.close(false);
  }

  registrarEstudiante(): void {
    this.loading = false;
    let newEstudiante = <Estudiante>Object.assign({}, this.formAddEstudiante.value);
    console.log(newEstudiante)
    this.estudianteService.save(newEstudiante).subscribe(
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
