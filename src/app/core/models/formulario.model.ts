import Horario from "./horario.model";
import Pregunta from "./pregunta.model";
import Programa from "./programa.model";

export default class Formulario {

  nombre_formulario: string;
  ubicacion_formulario: String;
  disponibilidad_inicio_formulario: Date;
  disponibilidad_fin_formulario: Date;
  tiempo_minimo: number;
  intervalo: number;
  duracion: number;
  restringe_estudiantes: boolean;
  restringe_otros_estudiantes: boolean;
  enlace_uuid_formulario: string;
  horarios: Horario[];
  programas: Programa;
  preguntas: Pregunta[];
}
