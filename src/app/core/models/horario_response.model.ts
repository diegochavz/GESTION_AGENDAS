export default class HorarioResponse {
  id:number;
  fecha_inicial: string;
  fecha_final:string;
  inicio_horario: string;
  fin_horario: string;
  se_repite:boolean;
  dias_semanas:number[];
  formulario: number;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  disponibilidad:boolean;
}
