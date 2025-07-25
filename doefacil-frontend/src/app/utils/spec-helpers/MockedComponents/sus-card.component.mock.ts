import { Component } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import Patient from "../../../models/Patient"
import { patientFactory } from "../MockedData/patient"

@Component({
	selector: "app-sus-card",
    template: "<p>MOCKED SUS CARD COMPONENT</p>"
})
export class MockedSusCardComponent{
	@Output() public patientEvent = new EventEmitter<Patient | string>();

    public emitPatientEvent(status: "VALID") : Patient
    public emitPatientEvent(status: "INVALID") : string
    public emitPatientEvent(status: "VALID" | "INVALID") : Patient | string{
        if(status == "VALID"){
            let patient = patientFactory()
            this.patientEvent.emit(patient)
            return patient
        }else{
            this.patientEvent.emit("111-1111-1")
            return "111-1111-1"
        }
    }
}
