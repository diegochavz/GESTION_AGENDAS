import {IService} from "./service.interface";
import {Observable} from "rxjs";
import Docente from "../models/docente.model";
import Programa from "../models/programa.model";
import Formulario from "../models/formulario.model";

export interface IDocenteService extends IService<Docente>{

  getProgramasByDocente(idDocente): Observable<Programa[]>

  getFormulariosByDocente(idDocente): Observable<Formulario[]>

}
