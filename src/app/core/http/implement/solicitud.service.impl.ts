import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Solicitud from "../../models/solicitud.model";
import {ISolicitudService} from "../solicitud.service.interface";

@Injectable()
export class SolicitudServiceImpl extends ServiceImpl<any> implements ISolicitudService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'solicitudes/';
  }

  getSolicitudByDocente(idDocente): Observable<Solicitud[]> {
    const path = `${idDocente}/docente`;
    return this.executeGet(path).pipe(map((res: any) => res.data));
  }

  saveSolicitud(solicitud:any):Observable<any>{
    const path =this.apiUrl+'registrar-solicitud/';
    return this.httpClient.post(path,solicitud) as Observable<any>;
  }
}
