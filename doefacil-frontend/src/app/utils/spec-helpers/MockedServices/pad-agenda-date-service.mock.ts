import { HttpClient } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Injectable } from "@angular/core";
import { Dispatch } from "./dispatch";
import { PADAgendaDateService } from "../../../services/pad-agenda-date.service"
import Utils from "../../utils";
import { agenda, getCityFromUrl, getDateFromUrl} from "../MockedData/agenda";
import { MethodVal, EachMethodVal } from "../type-helpers";
import { Observable, of } from "rxjs";
import PADAgendaDate from "src/app/models/PADAgendaDate";

@Injectable()
export class MockedPADAgendaDateService implements Partial<PADAgendaDateService>{

    public findByDate(date: string): Observable<PADAgendaDate> {
        let dates = [...agenda.cityA.dates, ...agenda.cityB.dates]
        let dateObj = dates.find(dateInf => dateInf.dateRes.date == date)

        if(dateObj == undefined) throw new Error(`Could not find date ${date} in the agenda`)
        return of(dateObj.dateRes);
    }

    public getFromURL(url: string): Observable<PADAgendaDate[]> {
        let city = getCityFromUrl(url)
        if(city == undefined) throw new Error(`Could not get the mocked date with the url (${url})`)
        
        return of(city.dates.map(dateInf => dateInf.dateRes));
    }
}
