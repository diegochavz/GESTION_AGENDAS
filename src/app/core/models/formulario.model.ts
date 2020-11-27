import Horario from "./horario.model";
import Pregunta from "./pregunta.model";

export default class Formulario {

  id:number;
  nombre_formulario: string;
  ubicacion_formulario: String;
  disponibilidad_inicio_formulario: string;
  disponibilidad_fin_formulario: string;
  tiempo_minimo: number;
  intervalo: number;
  duracion: number;
  restringe_estudiantes: boolean;
  restringe_otros_estudiantes: boolean;
  enlace_uuid_formulario: string;
  horarios: Horario[];
  programas: number[];
  preguntas: Pregunta[];
  carga_archivos: boolean;
  fecha_registro: Date;
  docente: string;
}
