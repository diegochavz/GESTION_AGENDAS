import {Observable} from "rxjs";
import ListResponse from "../models/list_response.model";

export interface IService<T> {

  getAll(): Observable<Array<T>>;

  get(id: number): Observable<T>;

  save(data: any): Observable<T>;

  update(id: number, data: T): Observable<T>;

  delete(id: number): Observable<T>;

  executeGet(path: string): Observable<T>;


  /**
  post(data: any, path?: string): Observable<any>;


  executeDelete(path: string): Observable<any>;

  filter(filter: any): Observable<ListResponse<T>>;
**/
}
