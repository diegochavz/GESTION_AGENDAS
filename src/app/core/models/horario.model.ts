import {Time} from "@angular/common";

export default class Horario {
  id:number;
  fecha_horario: string;
  inicio_horario: string;
  fin_horario: string;
  formulario: number;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  disponibilidad:boolean;

 constructor(fecha_horario:string,inicio_horario:string,fin_horario:string, id?, disponibilidad? ) {
    this.fecha_horario = fecha_horario;
    this.inicio_horario = inicio_horario;
    this.fin_horario = fin_horario;
    this.id = id;
    this.disponibilidad = disponibilidad;
  }
}
