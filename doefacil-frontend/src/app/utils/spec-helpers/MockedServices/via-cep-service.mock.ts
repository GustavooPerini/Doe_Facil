import { Injectable } from "@angular/core";
import { CepAddress, ViaCepService } from "../../../services/via-cep.service"
import Utils from "../../utils"
import { patientFactory } from "../MockedData/patient";

import { ConfigError, CreateSpy, MockedDirective, Spyable } from "./mocking-directive-utils";
import { Observable, of, throwError } from "rxjs";

type ReturnConfig = {
    getAddress: "SUCCESS" | "ERROR"
}

@Injectable()
@Spyable
export class MockedViaCepService extends MockedDirective<ViaCepService, ReturnConfig>
                                 implements Partial<ViaCepService>{

    @CreateSpy("ViaCep getAddress")                    
    getAddress(cep: string): Observable<CepAddress> {
        let returnVal : Observable<CepAddress>;

        switch(this.returnConfig.getAddress){
            case "SUCCESS":
                let patient = patientFactory()
                returnVal = of({
                    city: patient.address.city,
                    neighborhood: patient.address.neighborhood,
                    state: patient.address.state,
                    street: patient.address.street,
                    uf: Utils.getUfFromState(patient.address.state)
                } as CepAddress) 
                break;
            case "ERROR":
                returnVal = throwError(() => new Error("Error when retrieving the cep"))
                break;
            case undefined:
                throw new ConfigError(ViaCepService, "getAddress")
        }

        this.returnConfig.getAddress = undefined;
        return returnVal;
    }
    
}

