import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { URL_API } from "../utils/url-api";

@Injectable({
	providedIn: "root",
})
export class StateBrazilService {
	constructor(private http: HttpClient) { }

	public findByNameContainingIgnoreCase(name: string): Observable<any> {
		return this.http
			.get(
				`${URL_API}/api/state-brazil/search/findByNameContainingIgnoreCase?name=${name}`
			)
			.pipe(
				map((resp: any) =>
					resp["_embedded"]["state-brazil"].map(
						(est: { name: string }) => est.name
					).slice(0, 5)
				)
			);
	}
}
