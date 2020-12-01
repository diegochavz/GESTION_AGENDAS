import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocenteServiceImpl} from "../../../../core/http/implement/docente.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

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
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService) {
    this.idDocente = data.idDocente;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  borrar():void{
    this.loading = false;
    this.docenteService.delete(this.idDocente).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Docente eliminado satisfactoriamente',
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
