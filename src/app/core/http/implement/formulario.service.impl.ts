import {ServiceImpl} from "./service.impl";
import Formulario from "../../models/formulario.model";
import {IFormularioService} from "../formulario.service.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FormularioServiceImpl extends ServiceImpl<Formulario> implements IFormularioService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'formularios/';
  }
}
