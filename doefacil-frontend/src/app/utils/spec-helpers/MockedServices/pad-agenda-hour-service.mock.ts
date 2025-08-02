import { HttpClient } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Injectable } from "@angular/core";
import { Dispatch } from "./dispatch";
import { PADAgendaHourService } from "../../../services/pad-agenda-hour.service"
import Utils from "../../utils";
import { agenda, fakeUrl, getDateFromUrl } from "../MockedData/agenda";
import { EachMethodVal, MethodVal } from "../type-helpers";
import { MockedDirective, Spyable } from "./mocking-directive-utils";
import { Observable, of } from "rxjs";
import PADAgendaHour from "src/app/models/PADAgendaHour";
import PADAgendaDate from "src/app/models/PADAgendaDate";


@Injectable()
export class MockedPADAgendaHourService implements Partial<PADAgendaHourService>{

    public getFromURL(url: string): Observable<PADAgendaHour[]> {
        let date = getDateFromUrl(url)
        if(date == undefined) throw new Error(`Could not get the mocked hour with the url (${url})`)
        return of(date.hours);
    }
}
