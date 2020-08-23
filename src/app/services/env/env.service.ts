import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8080/hotels_api_war/';
  CURRENT_USER: User;

  constructor() { }

  setCurrentUser(user: User){
    this.CURRENT_USER = user
  }
}
