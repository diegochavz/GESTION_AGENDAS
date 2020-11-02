import {IService} from "../service.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';
import ListResponse from "../../models/list_response.model";

@Injectable()
export class ServiceImpl<T> implements IService<T> {

  httpClient: HttpClient;
  apiUrl: string;
  resource: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Observable<Array<T>> {
    return this.httpClient.get(this.getFullPath()).pipe(map((res: ListResponse<T>) => res.data));
  }

  get(id: string): Observable<T> {
    return this.httpClient.get(this.getFullPath() + id).pipe(map((res: any) => <T>res.data));
  }

  save(data: any): Observable<number> {
    return this.httpClient.post(this.getFullPath(), data).pipe(map((res: any) => res.data));
  }

  update(id: string, data: T): Observable<string> {
    return this.httpClient.put(this.getFullPath() + id, data).pipe(map((res: any) => res));
  }

  delete(id: string): Observable<string> {
    return this.httpClient.delete(this.getFullPath() + id).pipe(map((res: any) => res.data));
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

   executeGet(path: string): Observable<any> {
    return this.httpClient.get(this.getFullPath() + path).pipe(map((res: any) => res));
  }

   executeDelete(path: string): Observable<any> {
    return this.httpClient.delete(this.getFullPath() + path).pipe(map((res: any) => res));
  }
   **/
   protected getFullPath() {
    return this.apiUrl + this.resource;
  }

}
