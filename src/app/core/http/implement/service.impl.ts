import {IService} from "../service.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';
import ListResponse from "../../models/list_response.model";
import {HTTP_OPTIONS} from "../../constants/http_options.constants";

@Injectable()
export class ServiceImpl<T> implements IService<T> {

  httpClient: HttpClient;
  apiUrl: string;
  resource: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Observable<Array<T>> {
    return this.httpClient.get(this.getFullPath()) as Observable<Array<T>>;
  }

  get(id: number): Observable<T> {
    return this.httpClient.get(this.getFullPath() + id) as Observable<T>;
  }

  save(data: any): Observable<T> {
    return this.httpClient.post(this.getFullPath(), data) as Observable<T>;
  }

    update(id:number, data: T): Observable<T> {
    const path = this.getFullPath()+`${id}/`;
    return this.httpClient.put(path, data) as Observable<T>;
  }

  delete(id: number): Observable<T> {
    const path = this.getFullPath()+`${id}/`;
    return this.httpClient.delete(path) as Observable<T>;
  }

  executeGet(path: string): Observable<any> {
    return this.httpClient.get(this.getFullPath() + path) as Observable<T>;
  }

  /**
   post(data: any, path?: string): Observable<any> {
    if (!path) {
      path = '';
    }
    return this.httpClient.post(this.getFullPath() + path, data).pipe(map((res: any) => res.data));
  }

   filter(filter: any): Observable<ListResponse<T>> {
    filter =  _.omitBy(filter, [_.isUndefined, _.isNull, _.isEmpty]);
    return this.httpClient.get(this.getFullPath(), {params: filter}).pipe(map((res: ListResponse<T>) => res));
  }



   executeDelete(path: string): Observable<any> {
    return this.httpClient.delete(this.getFullPath() + path).pipe(map((res: any) => res));
  }
   **/
   protected getFullPath() {
    return this.apiUrl + this.resource;
  }

}
