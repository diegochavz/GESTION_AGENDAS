import {ServiceImpl} from "./service.impl";
import Formulario from "../../models/formulario.model";
import {IFormularioService} from "../formulario.service.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Horario from "../../models/horario.model";
import Programa from "../../models/programa.model";
import Pregunta from "../../models/pregunta.model";
import FormularioResponse from "../../models/formulario_response.model";

@Injectable()
export class FormularioServiceImpl extends ServiceImpl<any> implements IFormularioService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'formulario/';
  }

  getHorariosByFormulario(idFormulario): Observable<Horario[]>{
    const path = `${idFormulario}/horarios`;
    return this.executeGet(path) as Observable<Horario[]>;
  }

  getProgramasByFormulario(idFormulario): Observable<Programa[]>{
    const path = `${idFormulario}/programas-simple`;
    return this.executeGet(path) as Observable<Programa[]>;
  }

  getPreguntasByFormulario(idFormulario): Observable<Pregunta[]>{
    const path = `${idFormulario}/preguntas`;
    return this.executeGet(path) as Observable<Pregunta[]>;
  }

  getFormularioByEnlace(enlace): Observable<FormularioResponse[]>{
    const path = `?enlace=${enlace}`;
    return this.executeGet(path) as Observable<FormularioResponse[]>;
  }

  deleteHorarioById(idHorario):Observable<any>{
    const path = `horarios/${idHorario}`;
    return this.httpClient.delete(this.getFullPath() + path) as Observable<any>;
  }

  addHorariobyFormulario(idFormulario, horario):Observable<any>{
    const path = `${idFormulario}/horarios/`;
    console.log(path)
    return this.httpClient.post(this.getFullPath()+path, horario) as Observable<any>;
  }

  deletePreguntaById(idPregunta):Observable<any>{
    const path = `preguntas/${idPregunta}`;
    return this.httpClient.delete(this.getFullPath() + path) as Observable<any>;
  }

  addPreguntabyFormulario(idFormulario, pregunta):Observable<any>{
    const path = `${idFormulario}/preguntas/`;
    return this.httpClient.post(this.getFullPath()+path, pregunta) as Observable<any>;
  }

  updateHorarioByFormulario(idHorario, horario):Observable<any>{
    const path = `horarios/${idHorario}`;
    console.log("PUT HORARIOS --> ", JSON.stringify(horario))
    console.log(this.getFullPath()+path)
    return this.httpClient.put(this.getFullPath()+path, horario) as Observable<any>;
  }

  updatePreguntaByFormulario(idPregunta, pregunta):Observable<any>{
    const path = `preguntas/${idPregunta}`;
    return this.httpClient.put(this.getFullPath()+path, pregunta) as Observable<any>;
  }

 getHorariosByIdDocenteAndIdFormulario(idDocente, idFormulario, fecha):Observable<any>{
    const path = `turnos-formulaio`;
    return this.httpClient.post(this.apiUrl +path, {"id_docente": idDocente, "id_formulario":idFormulario, "fecha": fecha}) as Observable<any>;
  }

}
