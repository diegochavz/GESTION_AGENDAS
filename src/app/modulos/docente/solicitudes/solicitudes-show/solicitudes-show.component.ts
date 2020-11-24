import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import SolicitudResponse from "../../../../core/models/solicitud_response.model";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import Respuesta from "../../../../core/models/respuesta.model";
import SolicitudEstudiante from "../../../../core/models/solicitud_estudiante.model";

@Component({
  selector: 'app-solicitudes-show',
  templateUrl: './solicitudes-show.component.html',
  styleUrls: ['./solicitudes-show.component.scss']
})
export class SolicitudesShowComponent implements OnInit {

  solicitud: SolicitudResponse;

  listRespuestas: Array<Respuesta> = new Array<Respuesta>();
  listEstudiantes: Array<SolicitudEstudiante> = new Array<SolicitudEstudiante>();

  constructor(private solicitudService: SolicitudServiceImpl,
              public dialogRef: MatDialogRef<SolicitudesShowComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.solicitud = data.solicitudResponse;
    this.listRespuestas = this.solicitud.respuestas_data;
    this.listEstudiantes = this.solicitud.estudiantes_data;
  }

  ngOnInit(): void {
  }

  get nombreFormulario():string{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      return this.solicitud.formulario_data.nombre_formulario;
    }
    return '';
  }

  get tipoAsesoria():boolean{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      return this.solicitud.es_virtual;
    }
    return false;
  }

  get ubicacion():string{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      return this.solicitud.formulario_data.ubicacion_formulario;
    }
    return '';
  }

  get fechaAsesoria():string{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      return this.solicitud.horario_data.fecha_horario + "  "+
        this.formatHora(this.solicitud.horario_data.inicio_horario)+" - "+
        this.formatHora(this.solicitud.horario_data.fin_horario);
    }
    return '';
  }


  formatHora(hora: string): string {
    return hora.split(':')[0] + ":" + hora.split(':')[1];
  }

  salir(): void {
    this.dialogRef.close(0);
  }
}
