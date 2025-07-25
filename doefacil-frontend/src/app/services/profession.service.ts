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

	/**
	 * @author Eduarda Magesk
	 * Method to search for professions names that contains the name
	 * @param name the string needs to be the same as on the database
	 */
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

	/**
	 * Método para buscar profissões cadastrados no banco de dados, utilizando paginação
	 * @author Andre Pacheco
	 * @param page página a ser buscada
	 * @param itensPerPage Quantidade de profissões por página
	 */
	public getAllPaged(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/profession?page=${page}&size=${itensPerPage}&sort=name`
		);
	}

	/**
	 * Método para deletar uma profissão do banco de dados
	 * @author Andre Pacheco
	 * @param url String com a url da profissão a ser deletada
	 */
	public delete(url: string): Observable<any> {
		return this.http.delete(url);
	}

	/**
	 * Método para inserir uma profissão no banco de dados
	 * @author Andre Pacheco
	 * @param profession A profissão a ser inserido
	 */
	public insert(prof: Profession): Observable<any> {
		return this.http.post(`${URL_API}/api/profession`, prof);
	}
}
