import Programa from "./programa.model";
import DocenteResponse from "./docente_response.model";

export default class ProgramaResponse{
  id:number;
  docente: number;
  programa: number;
  programa_data: Programa;
  docente_data: DocenteResponse;
  esta_vinculado: boolean;
  fecha_registro:string;
  fecha_actualizacion:string;
}
