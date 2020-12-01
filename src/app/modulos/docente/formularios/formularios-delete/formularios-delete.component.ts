import {Component, Inject, OnInit} from '@angular/core';
import Asesoria from "../../../../core/models/solicitud.model";
import Formulario from "../../../../core/models/formulario.model";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormularioServiceImpl} from "../../../../core/http/implement/formulario.service.impl";
import {ToasterService} from "../../../../core/services/toaster.service";

@Component({
  selector: 'app-formularios-delete',
  templateUrl: './formularios-delete.component.html',
  styleUrls: ['./formularios-delete.component.scss']
})
export class FormulariosDeleteComponent implements OnInit {

  loading: boolean;

  idFormulario: number;

  constructor(private formularioService: FormularioServiceImpl,
              public dialogRef: MatDialogRef<FormulariosDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toasterService: ToasterService,) {
    this.idFormulario = data.idFormulario;
    this.loading = true;
  }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  borrar():void{
    this.loading = false;
    this.formularioService.setEstadoFormulario(this.idFormulario, 0).subscribe(
      (res) => {
        this.toasterService.openSnackBarCumtom(
          'Formulario eliminado satisfactoriamente',
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
