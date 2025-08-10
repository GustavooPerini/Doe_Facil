import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCirclePlus, faInbox, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { ConservationStatus } from '../../../models/enums/conservationStatus.enum';
import { ViaCepService } from '../../../services/via-cep.service';
import { ItemService } from '../../../services/item.service';
import { Category } from '../../../models/Category';
import { Router } from '@angular/router';
import { ItemCreate } from '../../../models/ItemCreate';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  public iconsFa = { faCirclePlus, faUser, faInbox, faMapLocationDot}

  public categories: Category[] = [];
  public conservationStatus = ConservationStatus

  submitted = false;
  sucessVisible = false;
  errorVisible = false;


  public liveForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ){
    this.createForm();
  }

  ngOnInit() {
    this.itemService.categories().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => (this.categories = [])
    });
  }

  createForm() {
    this.liveForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      categoryId: [null as unknown as number, [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
    })
  }

  onSubmit() {

    if(this.onValidate()) {

      this.itemService.create(this.liveForm.value as ItemCreate).subscribe({
        next: (response) => {
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

  goToDashboard() {
    this.toggleSuccessModal();
    this.router.navigate(["/dashboard"]);
  }
}
