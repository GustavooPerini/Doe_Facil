import User from "../../../models/User"

const user_obj = {
        fullName: "JORGE CABRA",
		email: "EUSOUOJORGE@JORMAIL.JOR",
		userName: "JORJAO123",
		passwd: "COXINHA123",
		allowed: true,
		role: "USER"
}

const city_obj = {
    fullName: "CIDADE A",
    email: "CIDADE@JORMAIL.JOR",
    userName: "CIDADEpppp",
    passwd: "cidade1231",
    allowed: true,
    role: "CITY"
}

export const userFactory = (type : "CITY" | "USER" | "SUPER") => {
    if(type == "CITY") return new User(city_obj);
    else if(type == "USER") return new User(user_obj);
    else return new User({...user_obj, role: "SUPER"})
}