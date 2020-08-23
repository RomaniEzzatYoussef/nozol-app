import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../env/env.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Category} from "../../models/category.model";
import {ServiceCategory} from "../../models/service-category.model";
import {Service} from "../../models/service.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private _categories = new BehaviorSubject<Category[]>([]);
    private _paidCategories = new BehaviorSubject<Category[]>([]);
    private _unpaidCategories = new BehaviorSubject<Category[]>([]);
    private _category = new BehaviorSubject<Category>(null);
    private _categoryServices = new BehaviorSubject<ServiceCategory[]>([]);
    private _categoryService = new BehaviorSubject<ServiceCategory>(null);
    private _services = new BehaviorSubject<Service[]>(null);

    get categories() {
        return this._categories.asObservable();
    }

    get paidCategories() {
        return this._paidCategories.asObservable();
    }

    get unpaidCategories() {
        return this._unpaidCategories.asObservable();
    }

    get category() {
        return this._category.asObservable();
    }

    get categoryServices() {
        return this._categoryServices.asObservable();
    }

    get categoryService() {
        return this._categoryService.asObservable();
    }

    get services() {
        return this._services.asObservable();
    }


    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private envService: EnvService
    ) {
    }

    getCategories(pageNo = 1, pageSize = 6): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/categories?access_token=${token}&limit=${pageSize}&pageNumber=${pageNo}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(categories => {
                this._paidCategories.next(categories);
            })
        );
    }

    getPaidCategories(id = 1, pageNo = 1, pageSize = 6): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/categoryType/${id}/categories?access_token=${token}&limit=${pageSize}&pageNumber=${pageNo}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(categories => {
                this._paidCategories.next(categories);
            })
        );
    }

    getUnPaidCategories(id = 2, pageNo = 1, pageSize = 6): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/categoryType/${id}/categories?access_token=${token}&limit=${pageSize}&pageNumber=${pageNo}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(categories => {
                this._unpaidCategories.next(categories);
            })
        );
    }


    getCategory(id: number): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/category/${id}?access_token=${token}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(category => {
                this._category.next(category);
            })
        );
    }


    getCategoryServicesByCategoryId(id: number, pageNo = 1, pageSize = 6): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/category/${id}/categoryServices?access_token=${token}&limit=${pageSize}&pageNumber=${pageNo}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(categoryServices => {
                this._categoryServices.next(categoryServices);
            })
        );
    }

    getCategoryService(id: number): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/categoryService/${id}?access_token=${token}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(categoryService => {
                this._categoryService.next(categoryService);
            })
        );
    }

    getServicesByCategoryServiceId(id: number): Observable<any> {
        return this.authService.token.pipe(take(1), switchMap(token => {
                return this.httpClient.get(
                    this.envService.API_URL + `/auth/categoryService/${id}/services?access_token=${token}`);
            }),
            map(resData => {
                return resData;
            }),
            tap(services => {
                this._services.next(services);
            })
        );
    }
}
