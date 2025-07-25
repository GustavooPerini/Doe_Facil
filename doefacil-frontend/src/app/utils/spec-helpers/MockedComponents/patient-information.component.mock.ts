import { Component, Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import Patient from "../../../models/Patient"
import { patientFactory } from "../MockedData/patient"

@Component({
	selector: "app-patient-information",
    template: "<p>MOCKED PATIENT INFO COMPONENT</p>"
})
export class MockedPatientInformationComponent{

	@Input() patient: Patient = new Patient();
	@Input() isSurgery: boolean = false;
	@Input() isCryotherapy: boolean = false;

	constructor() { }
}
