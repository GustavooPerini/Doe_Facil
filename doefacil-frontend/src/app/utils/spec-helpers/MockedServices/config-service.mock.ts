import Config from "../../../models/Config";
import { ConfigService } from "../../../services/config.service"
import { ConfigError, MockedDirective } from "./mocking-directive-utils"


type ReturnConfig = {
    get : Config
}

export class MockedConfigService extends MockedDirective<ConfigService, ReturnConfig>
                                 implements Partial<ConfigService>{

    public get(): Config {
        if(this.returnConfig.get == undefined)
            throw new ConfigError(ConfigService, "get")

        let returnVal = this.returnConfig.get
        this.returnConfig.get = undefined;
        return returnVal;
    }
}