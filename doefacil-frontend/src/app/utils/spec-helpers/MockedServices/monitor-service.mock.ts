import { Observable, of } from "rxjs"
import { MonitorService } from "../../../services/monitor.service"
import { ConfigError, MockedDirective, Spyable } from "./mocking-directive-utils"
import { Injectable } from "@angular/core"
import Monitor from "../../../models/Monitor"



type ReturnConfig = {
    findAllByFieldAndRole : Monitor[]
}

@Injectable()
@Spyable
export class MockedMonitorService extends MockedDirective<MonitorService, ReturnConfig>
                                  implements Partial<MonitorService>{


    public findAllByFieldAndRole(field: string, role: string): Observable<Monitor[]> {
        if(this.returnConfig.findAllByFieldAndRole == undefined)
            throw new ConfigError(MonitorService, "findAllByFieldAndRole")

        let returnVal = this.returnConfig.findAllByFieldAndRole
        this.returnConfig.findAllByFieldAndRole = undefined
        return of(returnVal)
    }
}