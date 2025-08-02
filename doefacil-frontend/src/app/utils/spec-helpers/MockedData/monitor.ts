import Monitor from "../../../models/Monitor"

const _monitorObj = {
    name: "Robertin Navalha",
    field: "DERMATOLOGIA",
    role: "CHEFE",
    href: "MONITOR_HREF/ROBERTIN"
}

export const monitorObj = {..._monitorObj} as const

export const monitorFactory = (monitorObj : Partial<typeof _monitorObj> = {}) => {
    return new Monitor({..._monitorObj, ...monitorObj})
}