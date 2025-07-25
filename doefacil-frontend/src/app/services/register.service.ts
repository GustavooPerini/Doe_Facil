import { Injectable } from "@angular/core";
import Woman from "../models/Woman";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URL_API } from "../utils/url-api";
import Child from "../models/Child";

@Injectable({
    providedIn: "root",
})
export class RegisterService {
    constructor(
        private http: HttpClient,
    ) { }

    public registerWoman(woman: Woman): Observable<any> {
        return this.http.post(`${URL_API}/api/woman`, woman);
    }

    public registerChild(child: Child): Observable<any> {
        return this.http.post(`${URL_API}/api/child`, child);
    }
}