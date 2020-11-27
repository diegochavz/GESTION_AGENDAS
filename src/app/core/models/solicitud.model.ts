import Respuesta from "./respuesta.model";
import EstudianteResponse from "./estudiante_response.model";

export default class Solicitud {
  id: number;
  id_formulario: number;
  id_docente: string;
  fecha: string;
  hora:string;
  archivo:File;
  respuestas: Respuesta[];
  estudiantes: EstudianteResponse[];
  es_virtual:boolean;
}
