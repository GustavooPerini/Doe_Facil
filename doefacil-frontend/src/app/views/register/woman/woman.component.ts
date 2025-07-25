import { OccupationStatus } from './../../../models/enums/occupationStatus.enum';
import { EducationLevel } from './../../../models/enums/educationalLevel.enum';
import { MaritalStatus } from './../../../models/enums/maritalStatus.enum';
import { Race } from './../../../models/enums/race.enum';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { cilUserFemale } from '@coreui/icons';
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Woman from '../../../models/Woman';
import { RegisterService } from '../../../services/register.service';
import { AutocompleteService } from '../../../services/autocomplete.service';

@Component({
	selector: 'app-woman',
	templateUrl: './woman.component.html',
})
export class WomanComponent {
  	public icons = { cilUserFemale }
	public iconsFa = { faCirclePlus };
	
	public WomanRaces = Race;
	public WomanMaritalStatus = MaritalStatus;
	public WomanEducationLevel = EducationLevel;
	public WomanOccupationStatus = OccupationStatus;

	public listStatesBrazil: any;
	public listCitiesBrazil: any;
	
	submitted = false;
	successVisible = false;
	errorVisible = false;
	
	woman?: Woman;
	
	public liveForm!: FormGroup
	
	constructor(
		private registerService: RegisterService,
		private autocompleteService: AutocompleteService,
		private formBuilder: FormBuilder
	){
		this.createForm();
	}
	
	createForm(){
		this.liveForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			birthDate: ["", [Validators.required]],
			race: ["", [Validators.required]],
			birthCity: ["", [Validators.required]],
			birthState: ["", [Validators.required]],
			maritalStatus: ["", [Validators.required]],
			educationLevel: ["", [Validators.required]],
			occupationStatus: ["", [Validators.required]],
			lastOccupationDescription: ["", [Validators.required]],
			susCard: ["", [Validators.required, Validators.minLength(15)]],
			cpf: ["", [Validators.required, Validators.minLength(11)]],

			cep:  ["", [Validators.required, Validators.minLength(8)]],
			street:  ["", [Validators.required]],
			number:  ["", [Validators.required]],
			addInfo:  ["", [Validators.required]],
			neighborhood:  ["", [Validators.required]],
			city:  ["", [Validators.required]],
			refPoint: ["", [Validators.required]],

			phone:  ["", [Validators.required, Validators.minLength(10)]],
			mobile:  ["", [Validators.required, Validators.minLength(11)]],
			email:  ["", [Validators.required, Validators.email]],
		})

		this.listCitiesBrazil = this.autocompleteService.completeCityBrazil;
		this.listStatesBrazil = this.autocompleteService.completeStateBrazil;
	}

	isValid(ctrl: AbstractControl<any, any>){
		if (ctrl.touched && ctrl.valid)
			return true 
		else if ((ctrl.touched || this.submitted) && ctrl.invalid) 
			return false
		else
			return undefined
                            
	}

	onSubmit(){
		if(this.onValidate()){
			this.woman = new Woman(this.liveForm.value);
			console.log(this.woman);

			this.registerService.registerWoman(this.woman).subscribe({
				next : (response) => {
					this.onReset();
					this.toggleSuccessModal();
				},
				error : (error) => {
					this.onReset();
					this.toggleErrorModal();
				}
			})
		}

		this.submitted = true;
	}

	onReset() {
		this.submitted = false;
		this.liveForm.reset();
	}

	onValidate(){
		return this.liveForm.status === "VALID";
	}

	toggleSuccessModal() {
		this.successVisible = !this.successVisible;
	}

	handleSuccessModalChange(event: any) {
		this.successVisible = event;
	}

	toggleErrorModal() {
		this.errorVisible = !this.errorVisible;
	}

	handleErrorModalChange(event: any) {
		this.errorVisible = event;
	}
}