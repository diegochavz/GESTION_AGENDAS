import {Component, Inject, OnInit} from '@angular/core';
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-autorizaciones-approve',
  templateUrl: './autorizaciones-approve.component.html',
  styleUrls: ['./autorizaciones-approve.component.scss']
})
export class AutorizacionesApproveComponent implements OnInit {

  loading: boolean;

  idSolicitud: number;

  constructor(private solicitudService: SolicitudServiceImpl,
              public dialogRef: MatDialogRef<AutorizacionesApproveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idSolicitud = data.idAutorizacion;
    this.loading = true;
  }


  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close(0);
  }

  aprobar():void{
    this.loading = false;
    this.solicitudService.setEstadoAsesoria(this.idSolicitud, 2).subscribe(
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
