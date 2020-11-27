import {IService} from "./service.interface";
import {Observable} from "rxjs";
import Solicitud from "../models/solicitud.model";

export interface ISolicitudService extends IService<Solicitud> {

  getSolicitudByDocente(idSolicitud): Observable<Solicitud[]>

}
