import Estudiante from "./estudiante.model";

export default class Asesoria{
  id:number;
  id_formulario: number;
  fecha: string;
  hora_inicio:string;
  hora_fin:string;
  estudiantes: Estudiante[];
}
