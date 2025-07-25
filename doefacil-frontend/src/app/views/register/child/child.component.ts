import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cilUserFemale } from '@coreui/icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Child from '../../../models/Child';
import { BirthPlace } from '../../../models/enums/birthPlace.enum';
import { Gender } from '../../../models/enums/gender.enum';
import { Race } from '../../../models/enums/race.enum';
import { RegisterService } from '../../../services/register.service';




@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
})
export class ChildComponent {

    public icons = { cilUserFemale } // isso é para utilizar o ícone no html
    public iconsFa = { faCirclePlus } 
    
    public ChildRaces = Race;
    public ChildGenders = Gender;
    public BirthPlaces = BirthPlace;
    
    submitted = false;
    successVisible = false;
	errorVisible = false;

    child?:Child;

    public liveForm!: FormGroup;
    
    constructor(
        private registerService: RegisterService,
        private formBuilder: FormBuilder
    ) {
        this.createForm();
    }

    createForm() {
        this.liveForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            birthDate: ["", [Validators.required]],
            gender: ["", [Validators.required]],
            race: ["", [Validators.required]],
            birthWeight: ["", [Validators.required]],
            dischargeWeight: ["", [Validators.required]],
            dischargeDate: ["", [Validators.required]],
            currentWeight: ["", [Validators.required]],
            childLength: ["", [Validators.required]],
            headCircumference: ["", [Validators.required]],
            apgarScore: ["", [Validators.required]],
            birthPlace: ["", [Validators.required]],
            birthInstitution: ["", [Validators.required]],
            hospitalized: ["", [Validators.required]]
        });
    }

    isValid(ctrl: AbstractControl<any, any>) {
        if(ctrl.touched && ctrl.valid) {
            return true;
        }
        else if((ctrl.touched || this.submitted) && ctrl.invalid) {
            return false;
        }
        else {
            return undefined;
        }
    }

    onSubmit(){
            if(this.onValidate()){
                this.child = new Child(this.liveForm.value);
                console.log(this.child);
    
                this.registerService.registerChild(this.child).subscribe({
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
