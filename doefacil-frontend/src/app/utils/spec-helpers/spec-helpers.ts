import { DebugElement, Predicate, Type } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { Dispatch} from "./MockedServices/dispatch"
import { EachMethodVal, KeysInBoth, MethodOf } from "./type-helpers"
import { DefineReturn } from "./MockedServices/define-return";
import {MockedSusCardComponent} from "./MockedComponents/sus-card.component.mock"
/**
    Retrieves an element with the specified testid attribute.
*/ 
export function element(testId : string) {
    return {
        in: <T>(where : ComponentFixture<T> | DebugElement) => {
                if(where instanceof ComponentFixture){
                    return where.debugElement.query(By.css(`[data-testid="${testId}"]`));
                }else{
                    return where.query(By.css(`[data-testid="${testId}"]`))
                }
        }
    }
}

/**
    Type a text into a text input
*/
export function type(text : string){
    return {
        in: (element : DebugElement) => {
            expect(element).toBeTruthy()

            element.nativeElement.value = ""
            for(let i = 0; i<text.length; i++){
                element.nativeElement.value += text[i]
                let inputEvent = new Event('input')
                element.nativeElement.dispatchEvent(inputEvent)
            }
        	let blurEvent = new Event('blur');
            let changeEvent = new Event('change')
        	element.nativeElement.dispatchEvent(blurEvent)
            element.nativeElement.dispatchEvent(changeEvent)
        }
    }
}

/**Selects an option in a radio input*/ 
export function selectRadio(withValue : string){
    return {
        in: (element : DebugElement) => {
            let radioInput = filterChildrenTreeOf(element)
                                .by(Filter.tag("input"))
                                .by((el) => el.properties["type"] == "radio")
                                .by((el) => el.nativeElement.value == withValue)
                                [0]
            
            radioInput.nativeElement.dispatchEvent(new Event("change"))
        }
    }
}

/**Selects a date in a date input*/ 
export function selectDate(date : string){
    return {
        in: (element : DebugElement) => {
            element.nativeElement.value = date;
            element.nativeElement.dispatchEvent(new Event("input"))
        }
    }
}

export function component<J>(type : Type<J>) : {in(where: ComponentFixture<any> | DebugElement) : J}
export function component<J>(type : Type<J>, testID : string) : {in(where: ComponentFixture<any> | DebugElement) : J}
export function component<J>(type : Type<J>, testID ?: string){
    return {
        in: (where: ComponentFixture<any> | DebugElement) : J => {

            let searchElem = where instanceof ComponentFixture ? where.debugElement 
                                                               : where
            if(testID != undefined) {
                return element(testID).in(where)?.componentInstance;
            }else {
                return searchElem.query(By.directive(type))?.componentInstance;
            }

        }
    }
}

/**
    Clicks in a button, ignoreDisable determines if it should click
    even if the button is disabled.
*/
export function clickIn(element : DebugElement, ignoreDisable = false){
    expect(element).toBeTruthy()
    if(ignoreDisable || !element.properties['disabled'])
        element.triggerEventHandler("click", null)
}

export const Filter = {
    /**Filters by the element tag*/
    tag: (...tag : string[]) => 
            (el : DebugElement) => tag.includes(el.name),

    /**Filters by the testId prefix [data-testid="(prefix)-etc"]*/ 
    testIdStartWith: (prefix : string) =>
            (el : DebugElement) =>  
                `${el.attributes["data-testid"]}`.match(new RegExp(`^${prefix}-`)) != null,
}

class FilterBuilder extends Array<DebugElement>{
    
    constructor(private element : DebugElement){
        super();
    }

    private initiated = false

    private filterInPlace(filter : Predicate<DebugElement>){
        let idx = 0;
        for(let el of this){
            if(filter(el)){
                this[idx] = el;
                idx++;
            }
        }
        this.length = idx;
    }

    public by = (predicate: Predicate<DebugElement>) => {
        if(!this.initiated){
            this.push(...this.element.queryAll(predicate))
            this.initiated = true
        }else{
            this.filterInPlace(predicate);
        }
        return this
    }
    
}

/**
    Searches for a children with the specified filter
*/
export function filterChildrenTreeOf(element : DebugElement){
    return new FilterBuilder(element)
}

/**
    Selects a value in a select input element
*/
export function select(val : number | string){
    return{
        in: (element : DebugElement) =>{
            expect(element).toBeTruthy()
            let select = element.nativeElement
            let options = Array.from(select.options).map((optEl: any) => optEl.value)

            let testId = String(element.attributes["data-testid"])
            if(typeof val === 'string'){
                expect(options.includes(val))
                    .withContext(
                        `Expected an option of value '${val}' to exist in [${options}] in element with test id: ${testId}`)
                    .toBeTrue()
                select.value = val;
            }else{
                expect(options[val])
                    .withContext(`Expected an option of index ${val} to exist in [${options}] in element with test id: ${testId}`)
                    .toBeTruthy()

                select.value = select.options[val].value
            }
            select.dispatchEvent(new Event("change"))
        }
    }
    
}

function _withObject(prefix : string,
                    element : DebugElement,
                    data : any,
                    paramCallback ?: (param: string) => void
                ) {
    let count = 0;
    for(let param of Object.keys(data)){
        count++;
        let inputElementList = element.queryAll(Filter.testIdStartWith(prefix+"-"+param))

        if(inputElementList.length < 1){
            throw new Error("Element for data with key '"+ param + "' not found in the form")
        }else if(inputElementList.length > 1){
            throw new Error("Multiple elements for data with key '"+ param + "' were found in the form")
        }

        let inputElement = inputElementList[0]

        let testId : string = String(inputElement.attributes["data-testid"])
        let regexMatches = testId.match(/([^-]+)/g)
        let inputType = regexMatches?.[2]

        if(!inputType){
            throw new Error(`The testid '${testId}' does not follow the expected pattern for form completion`)
        }

        let val = data[param];
        
        if(!["text", "select", "radio", "date", "number"].includes(inputType)){
            throw new Error(`The type ${inputType} is not yet supported by the form filling util.`);
        }

        switch (inputType){
            case "text": 
            case "number":
                type(val.toString()).in(inputElement); break;
            case "select":
                select(val.toString()).in(inputElement); break;
            case "radio":
                selectRadio(val.toString()).in(inputElement); break;
            case "date":
                selectDate(val.toString()).in(inputElement); break;
        }
    
        if(paramCallback) paramCallback(param)
    }
    return count
}

/**
    Fills a form inputs marked with a certain prefix in the data-testid
    that must follow this pattern: data-testid="(prefix)-(input_name)-(input_type)-input".

    input_name will be the key searched in the data object to fill the input

    input_type determines how the input should be filled (select, radio, text, etc)
*/
export function fillForm(element : DebugElement) {
    return {
        /** the prefix in the input fields */
        byPrefix(prefix : string) {
            return {
                /**
                 * The data object with the values to place in the input fields 
                 * @param ignoreUndefinedData determines if missing data in the object should 
                 * generate an error or is expected.
                 */
                WithObject( data : any, 
                            ignoreUndefinedData : "IGNORE_MISSING_DATA" | "NOT_IGNORE_MISSING_DATA", 
                            paramCallback ?: (param: string) => void,
                    ) 
                    {
                        let count = _withObject(prefix, element, data, paramCallback)
                        if(ignoreUndefinedData == "NOT_IGNORE_MISSING_DATA"){
                            let inputList : DebugElement[] = 
                                filterChildrenTreeOf(element)
                                .by(Filter.testIdStartWith(prefix))
                            if(count != inputList.length){
                                throw new Error(`There are ${inputList.length} inputs to be filled in the form, but ${count} inputs were filled`);
                            }
                        }
                        
                    }
            }
        }
    }
}


/**
    Makes a http server mock dispatch a response with the provided configuration
*/
export function makeService<T, OPT>(service : Type<Dispatch<T, OPT>>){
    return {
        function: <J extends KeysInBoth<MethodOf<T>, keyof OPT>>(func : J) => {
            return {
                dispatch: (val : OPT[J]) => {
                    let obj : Partial<EachMethodVal<T, OPT>> = {}
                    obj[func] = val;
                    let serviceObj = TestBed.inject(service)
                    serviceObj.dispatch(obj)
                }
            }
        }
    }
}

/**
    Defines the return of a particular mock.
*/
export function defineReturnsOf<T, OPT>(service : Type<DefineReturn<T, OPT>>){
    return {
        /**Configures a particular function of the mock*/
        function: <J extends KeysInBoth<MethodOf<T>, keyof OPT>>(func: J) => {
            return {
                val: (val : OPT[J]) => {
                    let obj : Partial<EachMethodVal<T, OPT>> = {}
                    obj[func] = val;
                    let serviceObj = TestBed.inject(service)
                    serviceObj.defineReturn(obj)
                }
            }
        },
        /**Configures the entire mock with a configuration object*/
        basedOn: (func : Partial<EachMethodVal<T, OPT>>) => {
            let serviceObj = TestBed.inject(service)
            serviceObj.defineReturn(func)
        }
    }
}

/**
    Shorthand for TestBed.inject(service), better clarity.
*/
export function service<J>(service : Type<J>){
    return TestBed.inject(service)
}
