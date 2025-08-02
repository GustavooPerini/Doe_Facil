import Preceptor from "../../../models/Preceptor"

const _preceptorObj = {
    name: "Jorgin da Bala",
    crm: "1111-ES",
    cns: "111.111.111.111.111",
    cbo: "111.111",
    href: "PRECEPTOR_HREF/JORGIN"
}

export const preceptorObj = {..._preceptorObj} as const

export const preceptorFactory = (preceptorObj : Partial<typeof _preceptorObj> = {}) => {
    return new Preceptor({..._preceptorObj, ...preceptorObj})
}