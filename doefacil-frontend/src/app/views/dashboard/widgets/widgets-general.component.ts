import User from "../../../models/User";
import { Component, Input } from "@angular/core";
import {
	cilHospital,
	cilCalendar,
	cilPeople,
	cilBriefcase,
	cilAddressBook,
	cilMedicalCross,
	cilHealing,
} from "@coreui/icons";
import {
	faBandage,
	faSprayCan,
	faUserDoctor,
	faUsers,
	faBox,
} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-widgets-general",
	templateUrl: "./widgets-general.component.html",
})
export class WidgetsGeneralComponent {
	/***************************ICONS USED********************************/
	public icons = {
		cilCalendar,
		cilHospital,
		cilPeople,
		cilBriefcase,
		cilAddressBook,
		cilMedicalCross,
		cilHealing,
		faUsers,
		faUserDoctor,
		faBandage,
		faSprayCan,
		faBox
	};
	/**********************************************************************/
	public totalPatients: string = "-";
	public totalAppointments: string = "-";
	public totalCryos: string = "-";
	public totalSurgeries: string = "-";
	public schedPatients: string = "-";


	@Input()
	public loggedUser!: User;

	constructor(
	) { }

	ngOnInit() {
	}
}
