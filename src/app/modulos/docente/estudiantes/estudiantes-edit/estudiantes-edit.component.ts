import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Estudiante from "../../../../core/models/estudiante.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import EstudianteRequest from "../../../../core/models/estudiante_request.model";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-estudiantes-edit',
  templateUrl: './estudiantes-edit.component.html',
  styleUrls: ['./estudiantes-edit.component.scss']
})
export class EstudiantesEditComponent implements OnInit {

  loading: boolean;

  formEditEstudiante: FormGroup;

  estudiante: Estudiante;

  idEstudiante: number;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesEditComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService,) {
    this.loading = true;
    this.idEstudiante = data.idEstudiante;
  }

  ngOnInit(): void {
    this.formEditEstudiante = this._formBuilder.group({
      codigo_estudiante: ['', [Validators.required]],
      nombre_estudiante: ['', [Validators.required]],
      correo_estudiante: ['', [Validators.required]],
    });
    this.getEstudiante();
  }

  getEstudiante(){
    if(this.idEstudiante != null && this.idEstudiante!= undefined){
      this.loading = false;
      this.estudianteService.get(this.idEstudiante).subscribe((res: Estudiante) =>{
       this.estudiante = res;
      }, (error) =>{
        this.toasterService.openSnackBarCumtom(error,'error');
        this.loading = true;
        this.dialogRef.close();
      },()=>{
        this.loading = true;
       this.cargarDatosEstudiate();
      })
    }
  }

  cargarDatosEstudiate() {
    if (this.estudiante != null && this.estudiante != undefined) {
      this.formEditEstudiante.get('codigo_estudiante').setValue(this.estudiante.codigo_estudiante);
      this.formEditEstudiante.get('nombre_estudiante').setValue(this.estudiante.nombre_estudiante);
      this.formEditEstudiante.get('correo_estudiante').setValue(this.estudiante.correo_estudiante);
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  editarEstudiante(): void {
    this.loading = false;
    this.estudiante.codigo_estudiante = this.formEditEstudiante.value.codigo_estudiante;
    this.estudiante.nombre_estudiante = this.formEditEstudiante.value.nombre_estudiante;
    this.estudiante.correo_estudiante = this.formEditEstudiante.value.correo_estudiante;
    this.estudiante.docentes = this.estudiante.ids_docentes;

    this.estudianteService.update( this.estudiante.id, this.estudiante).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Estudiante actualizado satisfactoriamente',
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
