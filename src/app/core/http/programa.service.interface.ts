import {IService} from "./service.interface";
import Programa from "../models/programa.model";
import {Observable} from "rxjs";
import FormularioResponse from "../models/formulario_response.model";

export interface IProgramaService extends IService<Programa> {

  getFormulariosByPrograma(idPrograma): Observable<FormularioResponse[]>

}
