import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import Estudiante from "../../models/estudiante.model";
import {IEstudianteService} from "../estudiante.service.interface";

@Injectable()
export class EstudianteServiceImpl extends ServiceImpl<Estudiante> implements IEstudianteService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'estudiantes/';
  }

}
