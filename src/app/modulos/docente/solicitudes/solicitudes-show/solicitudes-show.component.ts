import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import SolicitudResponse from "../../../../core/models/solicitud_response.model";
import {SolicitudServiceImpl} from "../../../../core/http/implement/solicitud.service.impl";
import Respuesta from "../../../../core/models/respuesta.model";
import SolicitudEstudiante from "../../../../core/models/solicitud_estudiante.model";
import {URL_DOCUMENTO} from "../../../../core/constants/url_formulario.constants";

@Component({
  selector: 'app-solicitudes-show',
  templateUrl: './solicitudes-show.component.html',
  styleUrls: ['./solicitudes-show.component.scss']
})
export class SolicitudesShowComponent implements OnInit {

  solicitud: SolicitudResponse;

  listRespuestas: Array<Respuesta>;
  listEstudiantes: Array<SolicitudEstudiante>;

  idSolicitud: number;

  loading: boolean;

  constructor(private solicitudService: SolicitudServiceImpl,
              public dialogRef: MatDialogRef<SolicitudesShowComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idSolicitud = data.idSolicitud;
    this.listRespuestas = [];
    this.listEstudiantes = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.loading = false;
    this.solicitudService.get(this.idSolicitud).subscribe((res) =>{
      this.solicitud = res;
      this.listEstudiantes = res.estudiantes_data;
      this.listRespuestas = res.respuestas_data;
    },()=>{}, ()=>{
      this.loading = true;
    })
  }

  descargarArchivo(){

  }

  downloadFile(data: any, nombre: string, format: string) {
    let url = window.URL.createObjectURL(new Blob([data]));
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.href = url;
    a.download = `${nombre}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  get calificada():boolean{
    if(!this.solicitud!=null && this.solicitud!=undefined) {
      return this.solicitud.calificada ;
    }
    return false;
  }

  get calificacion():string{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      if(this.solicitud.calificada == true){
        switch (this.solicitud.calificacion) {
          case 1:
            return "NADA SATISFECHO";
          case 2:
            return "POCO SATISFECHO";
          case 3:
            return "NEUTRAL";
          case 4:
            return "MUY SATISFECHO";
          case 5:
            return "TOTALMENTE SATISFECHO";
          default:
            return '';
        }
      } else{
        return ''
      }
    }
    return '';
  }

  get observacion():string{
    if(!this.solicitud!=null && this.solicitud!=undefined){
      if(this.solicitud.calificada == true){
        return this.solicitud.observaciones_calificacion;
      } else {
        return '';
      }
    }
    return '';
  }

  get archivo(){
    if(!this.solicitud!=null && this.solicitud!=undefined){
      if(this.solicitud.filename != null && this.solicitud.filename != undefined && this.solicitud.filename != '')
      return URL_DOCUMENTO.BASE_DOCUMENTO+ this.solicitud.filename;
    } else {
      return null;
    }
    return null;
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
      return this.solicitud.fecha_solicitada;
    }
    return '';
  }

  get horaAsesoria(){
    if(!this.solicitud!=null && this.solicitud!=undefined){
      return this.formatHora(this.solicitud.horario_data.inicio_horario)+" - "+
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
