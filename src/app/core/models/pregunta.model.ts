import SeleccionesDataResponse from "./selecciones_data_response.model";

export default class Pregunta {
  id:number;
  nombre_campo: string;
  tipo_campo: string;
  tipo_dato: string;
  longitud: number;
  obligatoria: boolean;
  formulario:number;
  selecciones: string [];
  selecciones_data: SeleccionesDataResponse[];
  fecha_registro:Date;
  fecha_actualizacion: Date;
}
