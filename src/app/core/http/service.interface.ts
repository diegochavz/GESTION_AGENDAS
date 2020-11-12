import {Observable} from "rxjs";
import ListResponse from "../models/list_response.model";

export interface IService<T> {

  getAll(): Observable<Array<T>>;

  get(id: string): Observable<T>;

  save(data: any): Observable<number>;

  update(id: string, data: T): Observable<string>;

  delete(id: string): Observable<string>;

  executeGet(path: string): Observable<any>;


  /**
  post(data: any, path?: string): Observable<any>;


  executeDelete(path: string): Observable<any>;

  filter(filter: any): Observable<ListResponse<T>>;
**/
}
