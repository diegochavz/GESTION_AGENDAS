import {IService} from "./service.interface";
import {Observable} from "rxjs";
import Programa from "../models/programa.model";
import Formulario from "../models/formulario.model";
import Estudiante from "../models/estudiante.model";
import SolicitudResponse from "../models/solicitud_response.model";
import Horario from "../models/horario.model";
import EstudianteRequest from "../models/estudiante_request.model";

export interface IDocenteService extends IService<any>{

  getProgramasByDocente(idDocente): Observable<Programa[]>

  getFormulariosByDocente(idDocente): Observable<Formulario[]>

  getEstudiantesByDocente(idDocente): Observable<EstudianteRequest[]>

  getSolicitudesByDocente(idDocente): Observable<SolicitudResponse[]>

  getHorariosByDocente(idDocente): Observable<Horario[]>

}
