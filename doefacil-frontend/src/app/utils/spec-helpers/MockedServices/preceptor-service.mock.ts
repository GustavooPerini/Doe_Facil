import { Observable, of } from "rxjs"
import { PreceptorService } from "../../../services/preceptor.service"
import { ConfigError, CreateSpy, MockedDirective, Spyable } from "./mocking-directive-utils"
import { Injectable } from "@angular/core"
import Preceptor from "../../../models/Preceptor"


type ReturnConfig = {
    getAllSorted : Preceptor[]
}

@Injectable()
@Spyable
export class MockedPreceptorService extends MockedDirective<PreceptorService, ReturnConfig>
                                  implements Partial<PreceptorService>{
    
    @CreateSpy("MockedPreceptorService getAllSorted")
    public getAllSorted(): Observable<Preceptor[]> {
        if(this.returnConfig.getAllSorted == undefined)
            throw new ConfigError(PreceptorService, "getAllSorted")

        let returnVal = this.returnConfig.getAllSorted
        this.returnConfig.getAllSorted = undefined;
        return of(returnVal);
    }
}