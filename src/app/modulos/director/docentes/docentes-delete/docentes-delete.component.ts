import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";

@Component({
  selector: 'app-docentes-delete',
  templateUrl: './docentes-delete.component.html',
  styleUrls: ['./docentes-delete.component.scss']
})
export class DocentesDeleteComponent implements OnInit {
  loading: boolean;

  idDocente: number;

  constructor(private docenteService: DocenteServiceImpl,
              public dialogRef: MatDialogRef<DocentesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idDocente = data.idDocente;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  borrar():void{
    this.loading = false;
    this.docenteService.delete(this.idDocente).subscribe(
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
