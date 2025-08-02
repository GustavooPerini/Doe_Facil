import { Type } from "@angular/core";
import { EachMethodVal, KeysInBoth, MethodOf} from "../type-helpers";
import { DefineReturn } from "./define-return"


/** Base class for mocking directives with a basic DefineReturn interface implementation*/
export class MockedDirective<SERVICE, RETURN_CONFIG> 
                                implements DefineReturn<SERVICE, RETURN_CONFIG>{

    protected returnConfig : Partial<Pick<RETURN_CONFIG, KeysInBoth<keyof SERVICE, keyof RETURN_CONFIG>>> = {}

    defineReturn(method: Partial<EachMethodVal<SERVICE, RETURN_CONFIG>>) {
        this.returnConfig = {...this.returnConfig, ...method};
    }

}

const SPY_LIST_KEY = Symbol("SpyList")

/** Makes the function a jasmine spy
 * 
 * requires the class to be decorated with @see {Spyable}
*/
export function CreateSpy(jasmineSpyName : string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[SPY_LIST_KEY] = target[SPY_LIST_KEY] || new Map()
        target[SPY_LIST_KEY].set(propertyKey, jasmineSpyName)
    };
}

/** Allows the usage of @see {CreateSpy} decorator*/
export function Spyable<T extends {new(...args: any[]) : any}>(Base : T){
    return class extends Base {
        constructor(...args: any[]){
            super(...args);
            let spyList = Base.prototype[SPY_LIST_KEY]
            if(spyList){
                spyList.forEach((jasmineSpyName : string, propertyKey : string) => {
                    let descriptor = Object.getOwnPropertyDescriptor(Base.prototype, propertyKey)!
                    descriptor.value = jasmine.createSpy(jasmineSpyName, descriptor.value).and.callThrough()
                    Object.defineProperty(this, propertyKey, descriptor)
                });
            }
        }
    }
}

export class ConfigError<J> extends Error {
    constructor(directive: Type<J>, func : MethodOf<J>){
        super(`${directive.name}.${String(func)} was called but no return type was defined beforehand.`)
    }
}