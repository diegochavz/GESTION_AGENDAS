import {Injectable} from "@angular/core";
import UserResponse from "../models/user_response.model";

@Injectable()
export class DataUserService {

  dataUser: UserResponse;

  constructor() {
  }

  getDataUser(): UserResponse {
    return this.dataUser;
  }

  setDataUser(dataUser: UserResponse) {
    this.dataUser = dataUser;
  }
}
