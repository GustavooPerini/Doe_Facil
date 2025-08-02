import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_API } from "../utils/url-api";
import { map } from "rxjs/operators";
import Profession from "src/app/models/Profession";

@Injectable({
	providedIn: "root",
})
export class ProfessionService {
	constructor(private http: HttpClient) { }

	public findByNameContaining(name: string): Observable<any> {
		return this.http
			.get(
				`${URL_API}/api/profession/search/findByNameContaining?name=${name}`
			)
			.pipe(
				map((resp: any) =>
					resp["_embedded"].profession.map(
						(pro: { name: any }) => pro.name
					)
				)
			);
	}

	public getAllPaged(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/profession?page=${page}&size=${itensPerPage}&sort=name`
		);
	}

	public delete(url: string): Observable<any> {
		return this.http.delete(url);
	}

	public insert(prof: Profession): Observable<any> {
		return this.http.post(`${URL_API}/api/profession`, prof);
	}
}
