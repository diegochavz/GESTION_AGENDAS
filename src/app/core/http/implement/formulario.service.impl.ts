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

@Injectable()
export class FormularioServiceImpl extends ServiceImpl<Formulario> implements IFormularioService {

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



}
