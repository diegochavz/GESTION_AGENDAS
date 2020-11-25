import Programa from "./programa.model";

export default class UserResponse {
  access:string;
  tipo_usuario:number;
  nombre:string;
  correo:string;
  username:string;
  user_id:number;
  programas: Programa[];
}
