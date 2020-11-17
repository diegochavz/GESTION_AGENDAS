import {IService} from "./service.interface";
import Programa from "../models/programa.model";
import {Observable} from "rxjs";
import Asesoria from "../models/asesoria.model";

export interface IAsesoriaService extends IService<Asesoria> {

  getAsesoriasByDocente(idAsesoria): Observable<Asesoria[]>

}
