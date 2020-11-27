import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import Horario from "../../models/horario.model";
import {IHorarioService} from "../horario.service.interface";
import {Observable} from "rxjs";

@Injectable()
export class HorarioServiceImpl extends ServiceImpl<Horario> implements IHorarioService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'horario/';
  }

}
