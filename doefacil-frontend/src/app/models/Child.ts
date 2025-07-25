import { Gender } from "./enums/gender.enum"
import { Race } from "./enums/race.enum";
import { BirthPlace } from "./enums/birthPlace.enum"

export default class Child {

    public name?: string;
    public birthDate?: Date;
    public gender?: Gender;
    public race?: Race;
    public birthWeight?: number;
    public dischargeWeight?: number;
    public dischargeDate?: Date;
    public currentWeight?: number;
    public childLength?: number;
    public headCircumference?: number;
    public apgarScore?: string;
    public birthPlace?: BirthPlace;
    public birthInstitution?: string;
    public hospitalized?: string; // Se está hospitalizado ou em domicílio


    constructor(object?: any) {
        if(object !== undefined) {
            this.updateUser(object);
        }
    }

    updateUser(object: any) {
        this.name = object.name.toUpperCase();
        this.birthDate = object.birthDate;
        this.gender = object.gender;
        this.race = object.race;
        this.birthWeight = object.birthWeight;
        this.dischargeWeight = object.dischargeWeight;
        this.dischargeDate = object.dischargeDate;
        this.currentWeight = object.currentWeight;
        this.childLength = object.childLength;
        this.headCircumference = object.headCircumference;
        this.apgarScore = object.apgarScore;
        this.birthPlace = object.birthPlace;
        this.birthInstitution = object.birthInstitution;
        this.hospitalized = object.hospitalized;
    }
}