import Appointment from "src/app/models/Appointment"
import Lesion from "src/app/models/Lesion"
import Patient from "src/app/models/Patient"

const _appointmentObj = {
    city: "CITY A",
    date: "27/06/2005",
    preceptor: "JUNIOR",
    monitor: "YASUO",
    service: "PAD",
    cryotherapyTestimonial: "RAKAN",
    qtyCryo: 4,
    obs: "OBS_OBS_OBS",
    href: "APPOINTMENT_HREF/ID",
    hrefLesions: "LESIONS_HREF",
    hrefPatient: "PATIENT_HREF",
};

export const appointmentObj = {..._appointmentObj} as const;

export function appointmentFactory(id: string, data : Partial<Omit<typeof _appointmentObj, "href">> = {}){
    /*
        TODO: Em muitos lugares no código é usado o lesionsHref/patientHref, mockar isso é muito complicado,
        pois teria que fazer uma interface capaz de relacionar os appointments com suas lesões pelo href, etc.
        Algo ainda mais complicado do que o que foi feito com o padAgenda. O ideal seria mudar para que em todo lugar
        utilize apenas o vetor lesions e a parte de fazer a requisição seria feita por
        baixo dos panos. Ou seja, criar uma interface para appointment, os serviços retornarão uma implementação que abstrai
        a parte da requisição, já os mocks retornarão uma implementação que retorna o vetor diretamente.
    */
    return new Appointment({...appointmentObj, ...data, href: "APPOINTMENT_HREF/"+id})
}