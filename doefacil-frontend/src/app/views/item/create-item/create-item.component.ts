import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCirclePlus, faInbox, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { ItemCategory } from '../../../models/enums/itemCategory.enum';
import { ConservationStatus } from '../../../models/enums/conservationStatus.enum';
import { ViaCepService } from '../../../services/via-cep.service';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  public iconsFa = { faCirclePlus, faUser, faInbox, faMapLocationDot}

  public categories = ItemCategory
  public conservationStatus = ConservationStatus

  submitted = false;
  sucessVisible = false;
  errorVisible = false;


  public liveForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private itemService: ItemService
  ){
    this.createForm();
  }

  createForm() {
    this.liveForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]],
      conservationStatus: ["", [Validators.required]],
      imageSrc: [null, [Validators.required]],
      street: ["", [Validators.required]],
      houseNumber: ["", [Validators.required]],
      addInfo: ["", [Validators.required]],
      neighborhood: ["", [Validators.required]],
      city: ["", Validators.required],
      state: ["", Validators.required],
      refPoint: ["", Validators.required],
      cep: ["", Validators.required]
      // owner
    })
  }

  onSubmit() {

    if(this.onValidate()) {

      this.itemService.createItem(this.liveForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.onReset();
          this.toggleSuccessModal();
        },
        error: (error) => {
          console.log(error);
          this.onReset();
          this.toggleErrorModal();
        }
      })
    }
  }

  fetchAddressByCep() {
    const cepControl = this.liveForm.get("cep");
    if(cepControl && cepControl.valid) {
      this.viaCepService.getAddress(cepControl.value).subscribe({
        next: (address) => {
          this.liveForm.patchValue({
            street: address.street,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state
          });
        },
        error: () => {
          this.liveForm.patchValue({
            street: "",
            neighborhood: "",
            city: "",
            state: ""
          });
        }
      });
    }
  }

  isValid(ctrl: AbstractControl<any, any>){
      if (ctrl.touched && ctrl.valid)
        return true 
      else if ((ctrl.touched || this.submitted) && ctrl.invalid) 
        return false
      else
        return undefined
                              
    }

    onValidate(){
		  return this.liveForm.status === "VALID";
    }
    
    onReset() {
      this.submitted = false;
      this.liveForm.reset();
	  }

    toggleSuccessModal() {
		  this.sucessVisible = !this.sucessVisible;
	  }

	handleSuccessModalChange(event: any) {
		this.sucessVisible = event;
	}

	toggleErrorModal() {
		this.errorVisible = !this.errorVisible;
	}

	handleErrorModalChange(event: any) {
		this.errorVisible = event;
	}

}
