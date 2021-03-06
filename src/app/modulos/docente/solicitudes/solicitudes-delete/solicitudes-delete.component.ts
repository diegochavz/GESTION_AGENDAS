import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

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
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService) {
    this.idSolicitud = data.idSolicitud;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  borrar():void{
    this.loading = false;
    this.solicitudService.setEstadoAsesoria(this.idSolicitud, 0).subscribe(
      () => {
        this.toasterService.openSnackBarCumtom(
          'Asesoría eliminada satisfactoriamente',
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
