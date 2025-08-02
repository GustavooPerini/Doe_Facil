import Address from "./Address";
import Constants from "../utils/constants"

export default class Patient {

    public susCard: string = "";
	public fullName: string = "";
	public birthDate: string = "";
	public motherName: string = "";
	public gender: string = "";
	public hasDisability: string = Constants.NO;
	public isHomeless: string = Constants.NO;
	public isPregnant: string = "";
	public skinColor: string = "";
	public rg: string = "";
	public address: Address = new Address();
	public birthPlace: string = "BRASIL";
	public profession: string = "";
	public sunlightExposureTime: number = 0;
	public laborMarketSituation: string = "";
	public scholarity: string = "";
	public familyIncome: string = "";
	public motherDescendancy: string = Constants.DO_NOT_KNOW;
	public fatherDescendancy: string = Constants.DO_NOT_KNOW;
	public maritalStatus: string = "";
	public hasPipedWater: string = "";
    public hasSewer: string = "";

    public href: string = "";

    constructor(obj?: any) {
		if (obj !== undefined) {
			this.updatePatient(obj);
		}
	}

    public updatePatient(object : any) {
        if (object._links !== undefined) {
			this.href = object._links.self.href;
		}

        if (object.href !== undefined) this.href = object.href;

        this.susCard = object.susCard;
		this.fullName = object.fullName.toUpperCase();
		this.birthDate = object.birthDate;
		this.motherName = object.motherName.toUpperCase();
		this.gender = object.gender.toUpperCase();

		this.hasDisability = object.hasDisability.toUpperCase();
		this.isHomeless = object.isHomeless.toUpperCase();
		this.isPregnant = object.isPregnant.toUpperCase();
		this.skinColor = object.skinColor.toUpperCase();
		this.rg = object.rg.toUpperCase();
		if (object.address === undefined) {
			this.address = new Address(object);
		} else {
			this.address = new Address(object.address);
		}
		this.birthPlace = object.birthPlace.toUpperCase();
		this.profession = object.profession.toUpperCase();
		this.sunlightExposureTime = object.sunlightExposureTime;
		this.laborMarketSituation = object.laborMarketSituation.toUpperCase();
		this.scholarity = object.scholarity.toUpperCase();
		this.familyIncome = object.familyIncome.toUpperCase();
		this.motherDescendancy = object.motherDescendancy.toUpperCase();
		this.fatherDescendancy = object.fatherDescendancy.toUpperCase();
		this.maritalStatus = object.maritalStatus.toUpperCase();
		this.hasPipedWater = object.hasPipedWater.toUpperCase();
		this.hasSewer = object.hasSewer.toUpperCase();
    }
}
