import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {IAuthenticationService} from "../authentication.service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import UserResponse from "../../models/user_response.model";
import User from "../../models/user.model";

@Injectable({providedIn: 'root'})
export class AuthenticationServiceImpl extends ServiceImpl<any> implements IAuthenticationService {


  private currentUserSubject: BehaviorSubject<UserResponse>;
  public currentUser: Observable<UserResponse>;

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'login/';
    this.currentUserSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('CURRENT_USER')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): UserResponse {
    return this.currentUserSubject.value;
  }

  login(user: User){
    return this.save(user).pipe(map((user: UserResponse) => {
      console.log(user)
      if(user){
        console.log("Guarde user")
        this.guardarSesionUser( user);
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }

  logout(){
    this.eliminarSesionUser()
    this.currentUserSubject.next(null);
  }


  get logeado(): boolean {
    return (localStorage.getItem('CURRENT_USER') !== null);
  }

  private guardarSesionUser(user: UserResponse):void{
    localStorage.setItem('CURRENT_USER', JSON.stringify(user))
  }

  private eliminarSesionUser(): void{
    localStorage.removeItem('CURRENT_USER');
  }

}
