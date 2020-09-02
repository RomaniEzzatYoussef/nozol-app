import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EnvService} from "../env/env.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {map, switchMap, take, tap} from "rxjs/operators";
import {User} from "../../models/user.model";
import {Image} from "../../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<User>(null);
  private _image = new BehaviorSubject<Image>(null);

  get user() {
    return this._user.asObservable();
  }

    get image() {
        return this._image.asObservable();
    }

  constructor(
      private authService: AuthService,
      private httpClient: HttpClient,
      private envService: EnvService
  ) {}

  getCurrentUser(): Observable<any> {
    return this.authService.token.pipe(take(1), switchMap(token => {
          return this.httpClient.get(
              this.envService.API_URL + `/auth/user/current?access_token=${token}`);
        }),
        map(resData => {
          return resData;
        }),
        tap(user => {
          this._user.next(user);
        })
    );
  }

  uploadImage(image: File) {
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', image , image.name);
      console.log(Image);
      console.log(image.name);
      console.log(uploadImageData);

      return this.authService.token.pipe(take(1), switchMap(token => {
          return this.httpClient.post(this.envService.API_URL + `/auth/image/upload?access_token=${token}`, uploadImageData, {observe: 'response'});
      }));

  }

  getImage(id: number): Observable<any>  {
      return this.authService.token.pipe(take(1), switchMap(token => {
          return this.httpClient.get(this.envService.API_URL + `/auth/image/${id}?access_token=${token}`);
          }),
          map(resData => {
              return resData;
          }),
          tap(image => {
              this._image.next(image);
          })
      );
  }

}
