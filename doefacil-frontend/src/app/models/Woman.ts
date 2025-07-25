import { OccupationStatus } from './enums/occupationStatus.enum';
import { EducationLevel } from './enums/educationalLevel.enum';
import { MaritalStatus } from "./enums/maritalStatus.enum";
import { Race } from "./enums/race.enum";

import Contact from "./Contact"
import Address from "./Address"

export default class Woman {
	public name?: string;
	public birthDate?: Date;
	public race?: Race;
	public age?: number;
	public birthCity?: number;
	public birthState?: number;
	public maritalStatus?: MaritalStatus;
	public educationLevel?: EducationLevel;
	public occupationStatus?: OccupationStatus;
	public lastOccupationDescription?: string; 
	public susCard?: string;
	public cpf?: string;

	public contact?: Contact;
	public address?: Address;

	constructor(object ?: any) {
		if(object !== undefined){
			this.updateUser(object);
		}
	}

	public updateUser(object : any){
		this.name = object.name.toUpperCase();
		this.birthDate = object.birthDate;
		this.race = object.race;
		this.birthCity = object.birthCity;
		this.birthState = object.birthState;

		this.maritalStatus = object.maritalStatus;
		this.educationLevel = object.educationLevel;
		this.occupationStatus = object.occupationStatus;
		this.lastOccupationDescription = object.lastOccupationDescription;
		this.susCard = object.susCard;
		this.cpf = object.cpf;

		this.contact = new Contact(object);
		this.address = new Address(object);
	}
}

