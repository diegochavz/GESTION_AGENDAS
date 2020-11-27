export default class Estudiante{
  id:number;
  nombre_estudiante: string;
  correo_estudiante:string;
  codigo_estudiante:string;
  programa: number;
  fecha_registro:Date;
  fecha_actualizacion:Date;
  ids_docentes: number[];
  docentes: number[]
}
