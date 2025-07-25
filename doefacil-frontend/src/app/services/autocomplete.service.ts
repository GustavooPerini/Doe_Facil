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

	/**
	 * @author Eduarda Magesk
	 * Method to autocomplete professions names using he term passed as a
	 * paramether. Must be used on inputs with [ngbTypeahead] from ng-bootstrap
	 */
	public completeProfession = (nome: Observable<string>) => {
		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.professionService.findByNameContaining(term)
			)
		);
	};

	/**
	 * @author Eduarda Magesk
	 * Method to autocomplete brazilian states names using he term passed as a
	 * paramether. Must be used on inputs with [ngbTypeahead] from ng-bootstrap
	 */
	public completeStateBrazil = (nome: Observable<string>) => {
		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.stateBrazilService.findByNameContainingIgnoreCase(term)
			)
		);
	};

	/**
	 * @author Eduarda Magesk
	 * Method to autocomplete brazilian cities names using he term passed as a
	 * paramether. Must be used on inputs with [ngbTypeahead] from ng-bootstrap
	 */
	public completeCityBrazil =  (nome: Observable<string>) => {

		return nome.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((term) =>
				this.cityBrazilService.findByNameContainingIgnoreCase(term)
			)
		);

		// return combineLatest([stateId, nome]).pipe(
		// 	debounceTime(400),
		// 	distinctUntilChanged(),
		// 	switchMap(([state, name]) => 
		// 		this.cityBrazilService.findByStateBrazilIdAndNameContainingIgnoreCase(state, name)
		// 	)
		// );
	};
}
