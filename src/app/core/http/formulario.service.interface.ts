import {IService} from "./service.interface";
import {Observable} from "rxjs";
import Horario from "../models/horario.model";
import Programa from "../models/programa.model";
import Pregunta from "../models/pregunta.model";
import FormularioResponse from "../models/formulario_response.model";

export interface IFormularioService extends IService<any>{

  getHorariosByFormulario(idFormulario): Observable<Horario[]>

  getProgramasByFormulario(idFormulario): Observable<Programa[]>

  getPreguntasByFormulario(idFormulario): Observable<Pregunta[]>

  getFormularioByEnlace(enlace): Observable<FormularioResponse[]>

  deleteHorarioById(idHorario):Observable<any>;

  addHorariobyFormulario(idFormulario, horario):Observable<any>

  deletePreguntaById(idPregunta):Observable<any>

  addPreguntabyFormulario(idFormulario, pregunta):Observable<any>

  updateHorarioByFormulario(idHorario, horario):Observable<any>

  updatePreguntaByFormulario(idPregunta, pregunta):Observable<any>

  //getHorariosByIdDocenteAndIdFormulario(idDocente, idFormulario):Observable<any>;

}
