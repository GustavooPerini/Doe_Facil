import User from "../../../models/User"
import { UserService } from "../../../services/user.service"
import { ConfigError, MockedDirective } from "./mocking-directive-utils"
import { userFactory } from "../MockedData/user"
import { Injectable } from "@angular/core"

type ReturnConfig = {
    getLoggedUser: "CITY" | "USER" | "SUPER" | User
}

@Injectable()
export class MockedUserService extends MockedDirective<UserService, ReturnConfig>
                               implements Partial<UserService>{
    
    public getLoggedUser(): User {
        if(this.returnConfig.getLoggedUser == undefined){
            throw new ConfigError(UserService, "getLoggedUser")
        }

        let returnVal : User
        if(this.returnConfig.getLoggedUser instanceof User){
            returnVal = this.returnConfig.getLoggedUser
        }else{
            returnVal = userFactory(this.returnConfig.getLoggedUser);
        }

        return returnVal;
    }
}