import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Observable, of, throwError } from "rxjs";
import { PatientService } from "src/app/services/patient.service";
import { patientFactory } from "../MockedData/patient";
import { Injectable } from "@angular/core";
import { Dispatch } from "./dispatch";
import { MethodVal, EachMethodVal } from "../type-helpers";
import Utils from "../../utils";
import { DefineReturn } from "./define-return";
import Patient from "src/app/models/Patient";
import { ConfigError, CreateSpy, MockedDirective, Spyable } from "./mocking-directive-utils";


type ReturnConfig = {
    findBySusCard: 'FOUND' | 'NOT_FOUND' | 'INVALID' | Patient
}

@Injectable()
@Spyable
export class MockedPatientService extends MockedDirective<PatientService, ReturnConfig>
                        implements Partial<PatientService>{

    @CreateSpy("PatientService findBySusCard")
    public findBySusCard(susNumber: string): Observable<Patient> {
        let conf = this.returnConfig.findBySusCard

        let returnVal : Observable<Patient>
        if(conf == "FOUND"){
            returnVal = of(patientFactory())
        }else if(conf == "NOT_FOUND"){
            returnVal = throwError(() => new HttpErrorResponse({status: HttpStatusCode.NotFound, statusText: "PATIENT NOT FOUND"}))
        }else if(conf == "INVALID"){
            returnVal = of(patientFactory({fullName: "R4K4N 23)_", birthDate: "01/01/1600"}))
        }else if(conf instanceof Patient){
            returnVal = of(conf)
        }else{
            throw new ConfigError(PatientService, "findBySusCard")
        }

        this.returnConfig.findBySusCard = undefined;
        return returnVal;
    }

    
    @CreateSpy("PatientService create")
    public create(patient: Patient): Observable<undefined> {
        return of(undefined)
    }

    @CreateSpy("PatientService update")
    public update(url: string, patientNewInformation: any): Observable<undefined> {
        return of(undefined)
    }
}
