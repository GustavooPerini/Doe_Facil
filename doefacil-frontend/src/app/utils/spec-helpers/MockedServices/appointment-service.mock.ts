import { EMPTY, Observable, of } from "rxjs"
import { AppointmentService } from "../../../services/appointment.service"
import { Page } from "../../structures/page"
import Appointment from "src/app/models/Appointment"
import { ConfigError, CreateSpy, MockedDirective, Spyable } from "./mocking-directive-utils"
import { Injectable } from "@angular/core"


type ReturnConfig = {
    getAllByPatientId: Appointment[]
} 

@Injectable()
@Spyable
export class MockedAppointmentService extends MockedDirective<AppointmentService, ReturnConfig>
                                      implements Partial<AppointmentService>{

    @CreateSpy("GetAllByPatientId Spy")
    public getAllByPatientId(id: string, page: number, itensPerPage: number): Observable<Page<Appointment>> {
        if(this.returnConfig.getAllByPatientId == undefined){
            throw new ConfigError(AppointmentService, "getAllByPatientId");  
        }

        let data = this.returnConfig.getAllByPatientId;
        let totalPages = Math.ceil(data.length / itensPerPage);

        let startIdx = itensPerPage * page;
        if(startIdx > data.length) throw new Error("Invalid Page Number.");

        let endIdx : number | undefined = startIdx + itensPerPage;
        if(endIdx >= data.length) endIdx = undefined // Until end of data.

        let pageData = data.slice(startIdx, endIdx);
        let pageObj = of(new Page<Appointment>(pageData, data.length, totalPages, page))

        this.returnConfig.getAllByPatientId = undefined;
        return pageObj;
    }

    public delete(appointmentId: number): Observable<null> {
        return of(null);
    }
}