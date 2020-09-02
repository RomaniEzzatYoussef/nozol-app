import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, from, Observable} from "rxjs";
import {User} from "../../models/user.model";
import {delay, map, switchMap, take, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Plugins} from "@capacitor/core";
import {EnvService} from "../env/env.service";
import {Image} from "../../models/image.model";

interface AuthResponseData {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

interface UserData {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private activeLogoutTimer: any;

    get userIsAuthenticated() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return !!user.token;
            } else {
                return false;
            }
        }));
    }

    get userId() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return user.id;
            } else {
                return null;
            }
        }));
    }

    get token() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return user.token;
            } else {
                return null;
            }
        }));
    }

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private envService: EnvService
    ) {}

    autoLogin() {
        return from(Plugins.Storage.get({key: 'authData'})).pipe(map(storedData => {
                if (!storedData || !storedData.value) {
                    return null;
                }
                const parsedData = JSON.parse(storedData.value) as {
                    access_token: string,
                    token_type: string,
                    expires_in: number,
                    scope: string,
                };
                const expirationTime = new Date(new Date().getTime() + (parsedData.expires_in * 1000));
            console.log("expirationDate: " + expirationTime);
            console.log("currentDate: " + new Date());
                if (expirationTime <= new Date()) {
                    return null;
                }
                const user = new User('', '','', '', '', '', new Image(10, 'blob' , 'name', []),  parsedData.access_token, expirationTime);
                return user;
            }), tap(user => {
                if (user) {
                    this._user.next(user);
                    this.autoLogout(user.tokenDuration);
                }
            }), map(user => {
                return !!user;
            })
        );
    }

    private autoLogout(duration: number) {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.activeLogoutTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }

    signup(name: string, email: string, password: string, phone: string, gender) {
        const userData = {name, email, password, phone, gender}
        return this.httpClient.post<UserData>(this.envService.API_URL + 'api/user', {...userData});
    }

    login(email: string, password: string) {
        let headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+btoa('client:secret')
            });
        const params = `?grant_type=password&username=${email}&password=${password}`;
        return this.httpClient.post<AuthResponseData>(this.envService.API_URL + 'oauth/token'+params, {}, {headers})
            .pipe(tap(authData => {
                this.setUserData(email, password, authData);
            }));

        // let headers =
        //     new HttpHeaders({
        //         'Access-Control-Allow-Origin': '*',
        //         "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
        //         "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        //         'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        //         Authorization: 'Basic '+btoa('client:secret')});
        // let param = new HttpParams();
        // param.append('username', email);
        // param.append('password', password);
        // param.append('grant_type','password');
        // param.append('client_id','client');
        // let options = ({ headers: headers , params: param});
    }

    logout() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this._user.next(null);
        Plugins.Storage.remove({key: 'authData'});
    }

    private setUserData(email: string, password: string, authResponseData: AuthResponseData) {
        const expirationTime = new Date(new Date().getTime() + (authResponseData.expires_in * 1000));
        const user = new User('', '', email, password, '', '', new Image(10, 'blob' , 'name', []), authResponseData.access_token, expirationTime);
        this._user.next(user);
        this.autoLogout(user.tokenDuration);
        this.storeAuthData(authResponseData);
    }

    private storeAuthData(userData: AuthResponseData) {
        const data = JSON.stringify({
            access_token: userData.access_token,
            token_type: userData.token_type,
            expires_in: userData.expires_in,
            scope: userData.scope,
        });
        Plugins.Storage.set({key: 'authData', value: data});
    }

    ngOnDestroy(): void {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
    }
}
