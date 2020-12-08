import {Time} from "@angular/common";

export default class Horario {
  id:number;
  fecha_inicial: string;
  fecha_final:string;
  inicio_horario: string;
  fin_horario: string;
  se_repite:boolean;
  dias_semanas:number[];
  formulario: number;
  disponibilidad: boolean;
}
