
import { StorageService } from "../../../services/storage.service"
import { DefineReturn } from "./define-return"
import { userFactory } from "../MockedData/user"
import Config from "src/app/models/Config"
import { EachMethodVal } from "../type-helpers"
import { Injectable } from "@angular/core"
import User from "src/app/models/User"
import { ConfigError, CreateSpy, MockedDirective, Spyable} from "./mocking-directive-utils"


type GetDataReturn = {
    loggedUserRole : "CITY" | "USER" ,
    config : "AT_PAD" | "NOT_AT_PAD"
}

type ReturnConfig = {
    getData: Partial<GetDataReturn>,
}

@Injectable()
@Spyable
export class MockedStorageService extends MockedDirective<StorageService, ReturnConfig>
                                  implements Partial<StorageService>{
    
    @CreateSpy("StorageService getData")
    public getData(key: string) {
        let conf = this.returnConfig.getData

        if(conf == undefined){
            throw new ConfigError(StorageService, "getData")
        }

        const sendError = () => {
            throw new Error(`Method getData was called with key '${key}',
                but no return value was defined beforehand for it.`)
        }

        if(key == "loggedUser"){
            if(conf.loggedUserRole == undefined){
                sendError()
                return;
            }

            let retUser : User = userFactory(conf.loggedUserRole);
            conf.loggedUserRole = undefined;
            return retUser;
        }

        if(key == "config"){
            if(conf.config == undefined){
                sendError()
            }

            let atPad = conf.config == "AT_PAD" 
            conf.config = undefined;
            return new Config({currentPadCity: "CIDADE A", atPad})
        }

        throw new Error(`Method getData was called with key '${key}',
                but that key is not implemented in the mock.`)
    }

}