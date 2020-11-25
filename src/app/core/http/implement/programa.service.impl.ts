import {ServiceImpl} from "./service.impl";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import Programa from "../../models/programa.model";
import {IProgramaService} from "../programa.service.interface";
import {Observable} from "rxjs";
import FormularioResponse from "../../models/formulario_response.model";
import Pregunta from "../../models/pregunta.model";

@Injectable()
export class ProgramaServiceImpl extends ServiceImpl<Programa> implements IProgramaService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'programa/';
  }

  getFormulariosByPrograma(idPrograma): Observable<FormularioResponse[]>{
    const path = `${idPrograma}/formularios`;
    return this.executeGet(path) as Observable<FormularioResponse[]>;
  }

}
