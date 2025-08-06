import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCirclePlus, faInbox, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { ItemCategory } from '../../../models/enums/itemCategory.enum';
import { ConservationStatus } from '../../../models/enums/conservationStatus.enum';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  public iconsFa = { faCirclePlus, faUser, faInbox, faMapLocationDot}

  public categories = ItemCategory
  public conservationStatus = ConservationStatus

  submitted = false;


  public liveForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder
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
      // donated
      // owner
    })
  }

  onSubmit() {
    console.log(this.liveForm.value);
  }

}
