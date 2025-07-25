export default class Contact {
    public phoneNumber?: string;
    public cellPhoneNumber?: string;
    public email?: string;

    constructor(object ?: any) {
        if(object !== undefined){
            this.updateContact(object);
        }
    }

    public updateContact(object : any){
        this.phoneNumber = object.phone;
        this.cellPhoneNumber = object.mobile;
        this.email = object.email;
    }
}