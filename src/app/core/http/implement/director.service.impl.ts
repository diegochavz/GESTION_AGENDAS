import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {IDirectorService} from "../director.service.interface";

@Injectable()
export class DirectorServiceImpl extends ServiceImpl<any> implements IDirectorService {

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'director/';

  }

}
