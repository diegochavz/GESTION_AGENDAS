import {IService} from "./service.interface";
import Formulario from "../models/formulario.model";
import {Observable} from "rxjs";
import Horario from "../models/horario.model";
import Programa from "../models/programa.model";
import Pregunta from "../models/pregunta.model";

export interface IFormularioService extends IService<Formulario>{

  getHorariosByFormulario(idFormulario): Observable<Horario[]>

  getProgramasByFormulario(idFormulario): Observable<Programa[]>

  getPreguntasByFormulario(idFormulario): Observable<Pregunta[]>
}
