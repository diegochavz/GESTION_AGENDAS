import Usuario from "./usuario.model";

export default class DocenteResponse {
  codigo_docente: string;
  usuario: Usuario;
  fecha_registro: Date;
  fecha_actualizacion: Date;
  programas:number[];
  nombre:string
  correo:string;
  contrasena:string;
}
