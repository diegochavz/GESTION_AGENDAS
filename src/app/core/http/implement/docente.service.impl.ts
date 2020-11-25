import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import Programa from "../../models/programa.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDocenteService} from "../docente.interface";
import Formulario from "../../models/formulario.model";
import Estudiante from "../../models/estudiante.model";
import SolicitudResponse from "../../models/solicitud_response.model";

@Injectable()
export class DocenteServiceImpl extends ServiceImpl<any> implements IDocenteService {

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

  getEstudiantesByDocente(idDocente): Observable<Estudiante[]>{
    const path = `${idDocente}/estudiantes-simple`;
    return this.executeGet(path) as Observable<Array<Estudiante>>;
  }

  getSolicitudesByDocente(idDocente): Observable<SolicitudResponse[]>{
    const path = `${idDocente}/solicitudes`;
    return this.executeGet(path) as Observable<Array<SolicitudResponse>>;
  }


}
