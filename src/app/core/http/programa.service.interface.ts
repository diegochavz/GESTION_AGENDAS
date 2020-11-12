import {IService} from "./service.interface";
import Programa from "../models/programa.model";
import {Observable} from "rxjs";

export interface IProgramaService extends IService<Programa> {

  getProgramasByDocente(idDocente): Observable<Programa[]>

}
