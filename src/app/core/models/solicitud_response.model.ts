import Respuesta from "./respuesta.model";
import EstudianteResponse from "./estudiante_response.model";
import DocenteResponse from "./docente_response.model";
import Horario from "./horario.model";
import FormularioResponse from "./formulario_response.model";
import SolicitudEstudiante from "./solicitud_estudiante.model";

export default class SolicitudResponse {
  id: number;
  formulario: number;
  docente: string;
  hora_solicitada: string;
  fecha:string
  es_virtual: boolean;
  archivo: string;
  estado: number;
  calificada:boolean;
  calificacion:number;
  observaciones_calificacion:string;
  fecha_registro:Date;
  fecha_calificacion:Date;
  docente_data: DocenteResponse;
  horario_data: Horario;
  formulario_data: FormularioResponse;
  respuestas_data: Respuesta[];
  estudiantes_data:SolicitudEstudiante[];
}
