import {Time} from "@angular/common";

export default class Horario {
  id:number;
  fecha_inicio: string;
  fecha_fin:string;
  inicio_horario: string;
  fin_horario: string;
  se_repite:boolean;
  dias_semanas:number[];
}
