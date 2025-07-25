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

	/**
	 * @author Guilherme Caldana
	 * Method used to create a patient
	 * @param patient
	 * @returns an observable of the quest
	 */
	public create(patient: Patient): Observable<undefined> {
		return this.http.post(`${URL_API}/api/patient`, patient).pipe(map(resp => undefined));
	}

	/**
	 * @author Eduarda Magesk
	 * Method used to get a patient by his sus number
	 * @param susNumber
	 * @returns an observable of the quest
	 */
	public findBySusCard(susNumber: string): Observable<Patient> {
		return this.http.get(
			`${URL_API}/api/patient/search/findBySusCard?susCard=${susNumber}`
		).pipe(map((patientObj) => new Patient(patientObj)));
	}

	/**
	 * @author Eduarda Magesk
	 * @param patientId the patient id who we are lookink for
	 * @returns an observable with the patient
	 */
	public getById(patientId: string): Observable<any> {
		return this.http.get(`${URL_API}/api/patient/${patientId}`);
	}

	/**
	 * @author Eduarda Magesk
	 * @param url url for the patient wanted
	 * @returns an observable with the patient
	 */
	public getByUrl(url: string): Observable<any> {
		return this.http.get(url);
	}

	/**
	 * @author Eduarda Magesk
	 * @param url url for the patient wanted
	 * @param patientNewInformation an object with the patient information that was modified
	 * @returns
	 */
	public update(
		url: string,
		patientNewInformation: any
	): Observable<undefined> {
		return this.http.patch(url, patientNewInformation).pipe(map(resp => undefined));
	}

	/**
	 * @author Eduarda Magesk
	 * Method to filter patients by the filter information
	 * @param page
	 * @param size
	 * @param patientName
	 * @param appointmentCity
	 * @param clinicalDiagnostic
	 * @param histoDiagnostic
	 * @param startDate
	 * @param endDate
	 * @param bodyRegionLesion
	 * @param withoutLesion
	 * @param withoutHistopathologic
	 * @returns
	 */
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

	/**
	 * @author Eduarda Magesk
	 * @param urlPatientAppointment appointment url to the patient attribute
	 * It's something like this: http://URL_API/api/appointment/appointmentId/patient
	 * @param urlPatient patient url to itself
	 * It's something like this: http://URL_API/api/patient/patientId
	 * @returns an observable with information about the association betweeen patient and appointment
	 */
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

	/**
	 * @author Eduarda Magesk
	 * @param urlPatientScheduling scheduling url to the patient attribute
	 * It's something like this: http://URL_API/api/scheduling/schedulingId/patient
	 * @param urlPatient patient url to itself
	 * It's something like this: http://URL_API/api/patient/patientId
	 * @returns an observable with information about the association betweeen patient and scheduling
	 */
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

	/**
	 * @author Eduarda Magesk
	 * Method to get patients to use on the autocomplete with nbtypeahead.
	 * It's usefull when when we need to look for a patient by his name
	 * @param name 
	 * @returns 
	 */
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

	/**
	 * @author Eduarda Magesk
	 * Methot to set the scheduling as done after the patient attend the appointment
	 * @param susCard 
	 * @param schedulingDate 
	 * @returns a string with the message of "Success" or "Error" from the action
	 */
	public changePatientSchedulingToDone(susCard: string, schedulingDate: string) {
		return this.http.get(`${URL_API}/api/patient/changeSchedulingToDone?susCard=${susCard}&schedulingDate=${schedulingDate}`);
	}

	/**
	 * Método para buscar pacientes, utilizando paginação
	 * @author Guilherme Teixeira
	 * @param page página a ser buscada
	 * @param itensPerPage Quantidade de usuários por página
	 */
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


	/**
   * Método para atualizar o campo auditado do paciente
   * @param url Url do paciente a ser atualizado
   * @param auditado Booleano com o valor de auditado
   * @author Guilherme Caldana
   */
	public updateAudited(url: string, audited: boolean): Observable<any> {
		const data = {
			'audited': audited
		};
		return this.http.patch(url, data);
	}

	/**
	 * Method to obtain all Patients with everything they have
	 * @author Matheus Goldner 
	 * @returns an observable resulted of the quest
	 */
	public getAllPatientsWithEverything(): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/getAllWithEverything`,
			{ reportProgress: true }
		);
	}

	/**
	 * Method to obtain the quantity of Patients
	 * @author Matheus Goldner 
	 * @returns an observable resulted of the quest
	 */
	public countPatients(): Observable<any> {
		return this.http.get(
			`${URL_API}/api/patient/search/countPatients`
		);
	}
}
