import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import Programa from "../../models/programa.model";
import {IProgramaService} from "../programa.service.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Asesoria from "../../models/asesoria.model";
import {IAsesoriaService} from "../asesoria.service.interface";

@Injectable()
export class AsesoriaServiceImpl extends ServiceImpl<Asesoria> implements IAsesoriaService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'asesorias/';
  }

  getAsesoriasByDocente(idDocente): Observable<Asesoria[]> {
    const path = `${idDocente}/docente`;
    return this.executeGet(path).pipe(map((res: any) => res.data));
  }
}
