import Patient from "src/app/models/Patient";
import Constants from "../../constants";
import { DeepPartial } from "../type-helpers";

const _patient_obj = {
        susCard: "705-4074-3381-9993",
        fullName: "ABEMILSO RAMOS DA SILVA",
        birthDate: "1964-11-29",
        motherName: "JACIRA FRANCISCA RAMOS",
        gender: "M",
        hasDisability: "I",
        isHomeless: "N",
        isPregnant: "IGN",
        skinColor: "BRANCA",
        rg: "296566",
        birthPlace: "AFONSO CLÁUDIO",
        profession: "IGNORADO",
        sunlightExposureTime: 0,
        laborMarketSituation: "IGN",
        scholarity: "FC",
        familyIncome: "3-5",
        motherDescendancy: Constants.DO_NOT_KNOW,
        fatherDescendancy: Constants.DO_NOT_KNOW,
        maritalStatus: "CASADO",
        hasPipedWater:  "I",
        hasSewer: "I",
        medicalRecord:  "NAO PREENCHIDO",
        SameMedicalRecord:  "272",
        useCigarette:  "N",
        useAlcohol:  "I",
        usePesticide:  "I",
        hasDiabetes:  "I",
        hasDrugAllergy:  "N",
        drugAllergyObs:  "",
        useAnticoagulant:  "N",
        anticoagulantObs:  "",
        hasHypertension:  "N",
        usePaceMaker:  "N",
        useSunscreen:  "N",
        solarDistrophy:  "PRE",
        fitzpatrickSkinType:  "3",
        familySkinCancerHistory:  "N",
        familyCancerHistory:  "N",
        sistolicPressure: -1,
        diastolicPressure: -1,
        obs: Constants.NONE,
        cep: "12345-123",
	city: "CIDADE A",
	houseNumber: "999",
	street: "RUA ABENILSON",
	neighborhood: "VIZINHANCA",
	phoneNumber: "(28)99912-3456",
	zone: "PERIURBANA",
	state: Constants.BRAZILIAN_STATES_AND_ACRONYMS_CEP[7][0],
        isBlocked: false,
        href: "/api/patients/JORGE",
        hrefAppointments: "/api/patients/JORGE/appointments"
}

export const patient_obj = {..._patient_obj} as const;

type DeepMutable<T> = { [key in keyof T]: T[key] }
export const patientFactory = (data ?: Partial<typeof _patient_obj>) => new Patient({...patient_obj, ...data});