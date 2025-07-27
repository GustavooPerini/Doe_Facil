import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import Patient from "../models/Patient";
import { URL_API } from "./../utils/url-api";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class PatientService {
	constructor(private http: HttpClient) { }

	public create(patient: Patient): Observable<undefined> {
		return this.http.post(`${URL_API}/api/patient`, patient).pipe(map(resp => undefined));
	}

	public findBySusCard(susNumber: string): Observable<Patient> {
		return this.http.get(
			`${URL_API}/api/patient/search/findBySusCard?susCard=${susNumber}`
		).pipe(map((patientObj) => new Patient(patientObj)));
	}

	public getById(patientId: string): Observable<any> {
		return this.http.get(`${URL_API}/api/patient/${patientId}`);
	}

	public getByUrl(url: string): Observable<any> {
		return this.http.get(url);
	}

	public update(
		url: string,
		patientNewInformation: any
	): Observable<undefined> {
		return this.http.patch(url, patientNewInformation).pipe(map(resp => undefined));
	}

	public filter(
		page: number,
		size: number,
		patientName?: string,
		appointmentCity?: string,
		clinicalDiagnostic?: string,
		histoDiagnostic?: string,
		startDate?: string,
		endDate?: string,
		bodyRegionLesion?: string,
		withoutLesion?: boolean,
		withoutHistopathologic?: boolean
	): Observable<any> {
		const form = new FormData();
		form.append("page", page.toString());
		form.append("size", size.toString());

		if (patientName !== undefined) {
			form.append("patientName", patientName);
		}
		if (appointmentCity !== undefined) {
			form.append("appointmentCity", appointmentCity);
		}
		if (clinicalDiagnostic !== undefined) {
			form.append("clinicalDiagnostic", clinicalDiagnostic);
		}
		if (histoDiagnostic !== undefined) {
			form.append("histoDiagnostic", histoDiagnostic);
		}
		if (startDate !== undefined) {
			form.append("startDate", startDate);
		}
		if (endDate !== undefined) {
			form.append("endDate", endDate);
		}
		if (bodyRegionLesion !== undefined) {
			form.append("bodyRegionLesion", bodyRegionLesion);
		}
		if (withoutLesion !== undefined) {
			if (withoutLesion) {
				form.append("withoutLesion", "true");
			} else {
				form.append("withoutLesion", "false");
			}
		}
		if (withoutHistopathologic !== undefined) {
			if (withoutHistopathologic) {
				form.append("withoutHistopathologic", "true");
			} else {
				form.append("withoutHistopathologic", "false");
			}
		}

		return this.http.post(`${URL_API}/api/filter/patient`, form);
	}

	public findByFullNameContaining(
		fullName: string,
		page: number,
		itensPerPage: number
	): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/search/findByFullNameContaining?fullName=${fullName}&page=${page}&size=${itensPerPage}&sort=date&sort=fullName`
		);
	}

	public linkPatientAndAppointment(
		urlPatientAppointment: string,
		urlPatient: string
	): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "text/uri-list",
			}),
		};
		return this.http.put(urlPatientAppointment, urlPatient, httpOptions);
	}

	public linkPatientAndScheduling(
		urlPatientScheduling: string,
		urlPatient: string
	): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "text/uri-list",
			}),
		};
		return this.http.put(urlPatientScheduling, urlPatient, httpOptions);
	}

	public findByNameContaining(name: string): Observable<any> {
		return this.http
			.get(
				`${URL_API}/api/patient/search/findByFullNameContaining?fullName=${name}&page=${0}&size=${10}&sort=date&sort=fullName`
			)
			.pipe(
				map((resp: any) =>
					resp["_embedded"].patient.map(
						(pro: any) => new Patient(pro)
					)
				)
			);
	}

	public delete(id: number): Observable<any> {
		return this.http.get(`${URL_API}/api/patient/delete?id=${id}`);
	}

	public changePatientSchedulingToDone(susCard: string, schedulingDate: string) {
		return this.http.get(`${URL_API}/api/patient/changeSchedulingToDone?susCard=${susCard}&schedulingDate=${schedulingDate}`);
	}

	public getNonAuditedPatientsPaged(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/search/findByAudited?audited=false&page=${page}&size=${itensPerPage}&sort=fullName`
		);
	}

	public getPatientsWithNonAuditedLesionsPaged(page: number, itensPerPage: number): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/search/getPatientsWithNonAuditedLesions?page=${page}&size=${itensPerPage}`
		);
	}

	public updateAudited(url: string, audited: boolean): Observable<any> {
		const data = {
			'audited': audited
		};
		return this.http.patch(url, data);
	}

	public getAllPatientsWithEverything(): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/getAllWithEverything`,
			{ reportProgress: true }
		);
	}

	public countPatients(): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/search/countPatients`
		);
	}
}
