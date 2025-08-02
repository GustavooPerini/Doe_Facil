import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { URL_API } from "../utils/url-api";

@Injectable({
	providedIn: "root",
})
export class CityBrazilService {
	constructor(private http: HttpClient) { }

	public findByNameContainingIgnoreCase(name: string): Observable<any> {
		return this.http
			.get(
				`${URL_API}/api/city-brazil/search/findByNameContainingIgnoreCase?name=${name}`
			)
			.pipe(
				map((resp: any) =>
					resp["_embedded"]["city-brazil"].map(
						(pro: { name: any }) => pro.name
					).slice(0, 8)
				)
			);
	}
}
