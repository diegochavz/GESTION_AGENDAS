import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import Estudiante from "../../../../core/models/estudiante.model";
import {AuthenticationServiceImpl} from "../../../../core/http/implement/authentication.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-estudiantes-add',
  templateUrl: './estudiantes-add.component.html',
  styleUrls: ['./estudiantes-add.component.scss']
})
export class EstudiantesAddComponent implements OnInit {

  loading: boolean;

  formAddEstudiante: FormGroup;

//DATOS PROVICIONAL
  idPrograma : number;
  idDocente :number;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesAddComponent>,
              private authenticationService : AuthenticationServiceImpl,
              private _formBuilder: FormBuilder,
              private toasterService: ToasterService) {
    this.idDocente = authenticationService.currentUserValue.user_id;
    this.idPrograma = authenticationService.currentUserValue.programas[0].programa;
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
    this.dialogRef.close();
  }

  registrarEstudiante(): void {
    this.loading = false;
    let newEstudiante = <Estudiante>Object.assign({}, this.formAddEstudiante.value);
    newEstudiante.programa = this.idPrograma;
    newEstudiante.ids_docentes = [this.idDocente]
    newEstudiante.docentes = [this.idDocente]
    this.estudianteService.save(newEstudiante).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Estudiante creado satisfactoriamente',
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
