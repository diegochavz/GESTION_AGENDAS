import Horario from "./horario.model";
import Pregunta from "./pregunta.model";

export default class FormularioResponse {

  id: number;
  nombre_formulario: string;
  ubicacion_formulario: string;
  disponibilidad_inicio_formulario: string;
  disponibilidad_fin_formulario: string;
  tiempo_minimo: number;
  intervalo: number;
  duracion: number;
  restringe_estudiantes: boolean;
  restringe_otros_estudiantes: boolean;
  enlace_uuid_formulario: string;
  carga_archivos: boolean;
  docente: string;
  activo:number;
  fecha_registro: Date;
}
