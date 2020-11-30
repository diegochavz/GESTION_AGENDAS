import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {IEstudianteService} from "../estudiante.service.interface";
import {Observable} from "rxjs";

@Injectable()
export class EstudianteServiceImpl extends ServiceImpl<any> implements IEstudianteService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'estudiante/';
  }

  loadDataEstudiante(data,): Observable<any> {
    const path = this.apiUrl+`upload-docentes/`;
    return this.httpClient.post(path, data) as Observable<any>;
  }


}
