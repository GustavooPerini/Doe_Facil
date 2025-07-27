import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import {
	debounceTime,
	distinctUntilChanged,
	map,
	switchMap,
} from "rxjs/operators";
import { ProfessionService } from "./profession.service";
import { StateBrazilService } from "./state-brazil.service";
import { CityBrazilService } from "./city-brazil.service";

@Injectable({
	providedIn: "root",
})
export class AutocompleteService {
	constructor(
		private professionService: ProfessionService,
		private stateBrazilService: StateBrazilService,
		private cityBrazilService: CityBrazilService,
	) { }

	public completeProfession = (nome: Observable<string>) => {
		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.professionService.findByNameContaining(term)
			)
		);
	};

	public completeStateBrazil = (nome: Observable<string>) => {
		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.stateBrazilService.findByNameContainingIgnoreCase(term)
			)
		);
	};

	public completeCityBrazil =  (nome: Observable<string>) => {

		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.cityBrazilService.findByNameContainingIgnoreCase(term)
			)
		);
	};
}
