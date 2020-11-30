import Usuario from "./usuario.model";
import Programa from "./programa.model";

export default class DirectorResponse {
  codigo_director: string;
  usuario: Usuario;
  fecha_registro:Date;
  fecha_actualizacion: Date;
  correo:string;
  contrasena:string;
  nombre:string;
  programas:number[];
  programas_data: Programa[];
  programa: number;
}
