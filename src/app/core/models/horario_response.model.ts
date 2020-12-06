export default class HorarioResponse {
  id:number;
  fecha_inicio: string;
  fecha_fin:string;
  hora_inicio: string;
  hora_fin: string;
  se_repite:boolean;
  dias_semanas:number[];
  formulario: number;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  disponibilidad:boolean;
}
