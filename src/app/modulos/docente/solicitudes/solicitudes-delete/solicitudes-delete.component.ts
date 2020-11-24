import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";

@Component({
  selector: 'app-solicitudes-delete',
  templateUrl: './solicitudes-delete.component.html',
  styleUrls: ['./solicitudes-delete.component.scss']
})
export class SolicitudesDeleteComponent implements OnInit {

  loading: boolean;

  idSolicitud: number;

  constructor(private solicitudService: SolicitudServiceImpl,
              public dialogRef: MatDialogRef<SolicitudesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idSolicitud = data.idSolicitud;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  borrar():void{
    this.loading = false;
    this.solicitudService.delete(this.idSolicitud).subscribe(
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
