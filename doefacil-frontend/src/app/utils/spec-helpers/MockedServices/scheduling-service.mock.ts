import { SchedulingService } from "../../../services/scheduling.service";
import { Observable, of } from "rxjs";
import { ConfigError, CreateSpy, MockedDirective, Spyable } from "./mocking-directive-utils"
import Scheduling from "src/app/models/Scheduling";
import { Injectable } from "@angular/core";


type ReturnConfig = {
    create : "SUCCESS" | "ERROR"
}

@Injectable()
@Spyable
export class MockedSchedulingService extends MockedDirective<SchedulingService, ReturnConfig>
                                     implements Partial<SchedulingService>{

    @CreateSpy("scheduling create")
    public create(scheduling: Scheduling): Observable<{ success: boolean; state: string; }> {
        let config = this.returnConfig.create;
        
        let returnVal : Observable<{ success: boolean; state: string; }>;
        if(config == "SUCCESS"){
            returnVal =  of({success: true, state: "success"});
        }else if(config == "ERROR"){
            returnVal = of({success: false, state: "error"});
        }else{
            throw new ConfigError(SchedulingService, "create")
        }

        this.returnConfig.create = undefined;
        return returnVal;
    }
}
