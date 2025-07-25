import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: "app-woman-history",
	templateUrl: "./woman-history.component.html",
})
export class WomanHistoryComponent {
	profileForm = new FormGroup({
		firstName: new FormControl(""),
		lastName: new FormControl(""),
	});

	// updateName() {
	//   this.name.setValue('Roberto');
	// }
}
