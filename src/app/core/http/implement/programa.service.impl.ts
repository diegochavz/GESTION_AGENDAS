import {ServiceImpl} from "./service.impl";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import Programa from "../../models/programa.model";
import {IProgramaService} from "../programa.service.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class ProgramaServiceImpl extends ServiceImpl<Programa> implements IProgramaService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'programa/';
  }

}
