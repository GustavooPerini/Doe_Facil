import { Observable, of } from "rxjs";
import { AutocompleteService } from "../../../services/autocomplete.service"
import { Injectable } from "@angular/core";

@Injectable()
export class MockedAutoCompleteService implements Partial<AutocompleteService>{
    public completeProfession = (nome: Observable<string>) => {
        return of(["", ""]);
    }
    
    public completeDescendancyRegion = (nome: Observable<string>) => {
        return of(["", ""]);
    }

    public completeCityBrazil = (nome: Observable<string>) => {
        return of(["", ""]);
    }

    public completeStateBrazil = (nome: Observable<string>) => {
        return of(["", ""]);
    }
    
}