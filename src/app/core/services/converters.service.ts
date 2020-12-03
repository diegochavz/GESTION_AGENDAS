import {Injectable} from "@angular/core";
import Formulario from "../models/formulario.model";
import EstudianteRequest from "../models/estudiante_request.model";
import {EstudianteTable} from "../util/interface_tables/estudiante_table.interface";
import {FormularioTable} from "../util/interface_tables/formulario_table.interface";
import * as moment from "moment";

@Injectable()
export class ConverterService {

  constructor() {
  }

  converterToTableEstudiantes(listEstudiantes: EstudianteRequest[]): EstudianteTable [] {
    let auxList = new Array<EstudianteTable>();
    for (let est of listEstudiantes){
      let estTable: EstudianteTable =  {
        id:est.estudiante_data.id,
        codigo: est.estudiante_data.codigo_estudiante,
        nombre: est.estudiante_data.nombre_estudiante,
        correo: est.estudiante_data.correo_estudiante
      }
      auxList.push(estTable)
    }
    return auxList;
  }

  converterToTableFormularios(listFormularios: Formulario[]): FormularioTable [] {
    let auxList = new Array<FormularioTable>();
    for (let form of listFormularios){
      let formTable: FormularioTable =  {
        id:form.id,
        nombre: form.nombre_formulario,
        creacion: moment(form.fecha_registro).format("YYYY-MM-DD"),
      }
      auxList.push(formTable)
    }
    return auxList;
  }
}
