import Usuario from "./usuario.model";

export default class Docente{
  id: number;
  codigo_docente: string;
  correo: string;
  contrasena: string;
  nombre: string;
  programas: number[];
  usuario: Usuario;
}
