import {Time} from "@angular/common";

export default class Horario {
  id:number;
  fecha_inicio: string;
  fecha_fin:string;
  hora_inicio: string;
  hora_fin: string;
  se_repite:boolean;
  dias_semanas:number[];
}
