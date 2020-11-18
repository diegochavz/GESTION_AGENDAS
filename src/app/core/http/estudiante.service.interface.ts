import {IService} from "./service.interface";
import Estudiante from "../models/estudiante.model";
import {Observable} from "rxjs";
import Formulario from "../models/formulario.model";

export interface IEstudianteService extends IService<Estudiante> {

}
