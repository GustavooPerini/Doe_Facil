import { State } from "../utils/constants";

export default class Address {
	public cep?: string = "";

	public street?: string = "";
	public houseNumber?: string = "";
	public addInfo?: string = "";
	public neighborhood?: string = "";
	public city?: string = "";
	public state?: State = "ESPÍRITO SANTO";
	public refPoint?: string = "";

	constructor(object ?: any) {
        if(object !== undefined){
            this.updateAddress(object);
        }
    }

	public updateAddress(object : any){
		this.cep = object.cep;

		this.street = object.street.toUpperCase();
		this.houseNumber = object.number;
		this.addInfo = object.addInfo;
		this.neighborhood = object.neighborhood.toUpperCase();
		this.city = object.city.toUpperCase();
		this.refPoint = object.refPoint;
	}
}
