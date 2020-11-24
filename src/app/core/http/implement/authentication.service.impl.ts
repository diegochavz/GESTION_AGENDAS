import {Injectable} from "@angular/core";
import {ServiceImpl} from "./service.impl";
import {HttpClient} from "@angular/common/http";
import {IAuthenticationService} from "../authentication.service.interface";
import {BehaviorSubject, Observable} from "rxjs";
import User from "../../models/user.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthenticationServiceImpl extends ServiceImpl<any> implements IAuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    super();
    this.httpClient = http;
    this.resource = 'nosesabe/';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('CURRENT_USER')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.save(user).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('CURRENT_USER', JSON.stringify(user))
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('CURRENT_USER');
    this.currentUserSubject.next(null);
  }

}
