import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-estudiantes-delete',
  templateUrl: './estudiantes-delete.component.html',
  styleUrls: ['./estudiantes-delete.component.scss']
})
export class EstudiantesDeleteComponent implements OnInit {


  loading: boolean;

  idEstudiante: number;

  constructor(private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService,) {
    this.idEstudiante = data.idEstudiante;
    this.loading = true;
  }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  borrar():void{
    this.loading = false;
    this.docenteService.deleteEstudianteDocente(this.idEstudiante).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Estudiante eliminado satisfactoriamente',
          'success')
        this.dialogRef.close();
      },
      (error) => {
        this.toasterService.openSnackBarCumtom(
          error,
          'error')
        this.dialogRef.close();
      },
      ()=>{
        this.loading = true;
      });
  }
}
