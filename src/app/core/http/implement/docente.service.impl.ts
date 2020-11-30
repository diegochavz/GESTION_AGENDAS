import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import Programa from "../../models/programa.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDocenteService} from "../docente.interface";
import Formulario from "../../models/formulario.model";
import SolicitudResponse from "../../models/solicitud_response.model";
import Horario from "../../models/horario.model";
import EstudianteRequest from "../../models/estudiante_request.model";

@Injectable()
export class DocenteServiceImpl extends ServiceImpl<any> implements IDocenteService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'docente/';
  }

  getProgramasByDocente(idDocente): Observable<Programa[]> {
    const path = `${idDocente}/programas-simple/`;
    return this.executeGet(path) as Observable<Array<Programa>>;
  }

  getFormulariosByDocente(idDocente): Observable<Formulario[]>{
    const path = `${idDocente}/formularios/`;
    return this.executeGet(path) as Observable<Array<Formulario>>;
  }

  getEstudiantesByDocente(idDocente): Observable<EstudianteRequest[]>{
    const path = `${idDocente}/estudiantes/`;
    return this.executeGet(path) as Observable<Array<EstudianteRequest>>;
  }

  getSolicitudesByDocente(idDocente): Observable<SolicitudResponse[]>{
    const path = `${idDocente}/solicitudes/`;
    return this.executeGet(path) as Observable<Array<SolicitudResponse>>;
  }

  getHorariosByDocente(idDocente): Observable<Horario[]>{
    const path = `${idDocente}/horarios/`;
    return this.executeGet(path) as Observable<Array<Horario>>;
  }

  deleteEstudianteDocente(idEstudianteDocente):Observable<any>{
  const path = `docente-estudiante/${idEstudianteDocente}/`;
  return this.httpClient.delete(this.apiUrl + path) as Observable<any>;
  }

}
