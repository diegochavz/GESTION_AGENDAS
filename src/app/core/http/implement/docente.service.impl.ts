import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import Programa from "../../models/programa.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Docente from "../../models/docente.model";
import {IDocenteService} from "../docente.interface";
import Formulario from "../../models/formulario.model";
import {map} from "rxjs/operators";
import {Form} from "@angular/forms";

@Injectable()
export class DocenteServiceImpl extends ServiceImpl<Docente> implements IDocenteService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'docente/';
  }

  getProgramasByDocente(idDocente): Observable<Programa[]> {
    const path = `${idDocente}/programas-simple`;
    return this.executeGet(path) as Observable<Array<Programa>>;
  }

  getFormulariosByDocente(idDocente): Observable<Formulario[]>{
    const path = `${idDocente}/formularios`;
    return this.executeGet(path) as Observable<Array<Formulario>>;
  }


}
