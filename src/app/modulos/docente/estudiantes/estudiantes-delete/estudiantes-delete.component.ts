import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EstudianteServiceImpl} from "../../../../core/http/implement/estudiante.service.impl";

@Component({
  selector: 'app-estudiantes-delete',
  templateUrl: './estudiantes-delete.component.html',
  styleUrls: ['./estudiantes-delete.component.scss']
})
export class EstudiantesDeleteComponent implements OnInit {


  loading: boolean;

  idEstudiante: number;

  constructor(private estudianteService: EstudianteServiceImpl,
              public dialogRef: MatDialogRef<EstudiantesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idEstudiante = data.idEstudiante;
    this.loading = true;
  }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  borrar():void{
    this.loading = false;
    this.estudianteService.delete(this.idEstudiante).subscribe(
      () => {
        this.dialogRef.close(1);
      },
      (error) => {
        this.dialogRef.close(2);
      },
      ()=>{
        this.loading = true;
      });
  }
}
