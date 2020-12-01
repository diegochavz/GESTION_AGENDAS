import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Solicitud from "../../models/solicitud.model";
import {ISolicitudService} from "../solicitud.service.interface";
import Reporte from "../../models/reporte.model";
import FormularioResponse from "../../models/formulario_response.model";

@Injectable()
export class SolicitudServiceImpl extends ServiceImpl<any> implements ISolicitudService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'solicitudes/';
  }

  getSolicitudByDocente(idDocente): Observable<Solicitud[]> {
    const path = `${idDocente}/docente/`;
    return this.executeGet(path).pipe(map((res: any) => res.data));
  }

  saveSolicitud(solicitud:any):Observable<any>{
    const path =this.apiUrl+'registrar-solicitud/';
    return this.httpClient.post(path,solicitud) as Observable<any>;
  }

  setEstadoAsesoria(id_solicitud, estado): Observable<any> {
    const path = `auditar-solicitud/`;
    return this.httpClient.post(this.apiUrl +path, {"id_solicitud":id_solicitud, "estado":estado}) as Observable<any>;
  }

  generarReporte(reporte: Reporte): Observable<any> {
    const path = `generar-solicitudes/`;
    return this.httpClient.post(this.apiUrl +path, reporte, {responseType: 'blob'}) as Observable<any>;
  }

  getSolicitudCalificacion(uuid): Observable<any> {
    const path = `solicitudes/?enlace=${uuid}`;
    return this.httpClient.get(this.apiUrl + path) as Observable<any>;
  }

  setCalificacionAsesoria(idSolicitud, calificacion, observaciones): Observable<any> {
    const path = `calificar-solicitud/`;
    return this.httpClient.post(this.apiUrl +path, {"id_solicitud":idSolicitud, "calificacion":calificacion,"observaciones": observaciones}) as Observable<any>;
  }

}
