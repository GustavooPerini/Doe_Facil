import { HttpClient } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Injectable } from "@angular/core";
import { Dispatch } from "./dispatch";
import { PADAgendaService } from "../../../services/pad-agenda.service"
import Utils from "../../utils";
import { agenda } from "../MockedData/agenda";
import { MethodVal, EachMethodVal } from "../type-helpers";
import { Observable, of } from "rxjs";
import PADAgenda from "src/app/models/PADAgenda";

@Injectable()
export class MockedPADAgendaService implements Partial<PADAgendaService>{

    public getAll(): Observable<PADAgenda[]> {
        return of([agenda.cityA.cityRes, agenda.cityB.cityRes])
    }

    public findByPlace(place: string): Observable<PADAgenda> {
        let places = [agenda.cityA, agenda.cityB]
        let agend = places.find(cityObj => cityObj.cityRes.place == place);

        if(agend == undefined) throw new Error(`The place (${place}) could not be found in the agenda.`)

        return of(agend.cityRes)
    }
}
