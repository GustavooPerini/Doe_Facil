import { DebugElement } from "@angular/core";
import { toContainText } from "@ngneat/spectator";
import { element } from "./spec-helpers";

let customMatchers : jasmine.CustomMatcherFactories = {
	elToBeDisabled: () => {
		return {
			compare: <T>(element ?: T)=> {
				let pass = true, message = ""

				if(!(element instanceof DebugElement)){
					pass = false
					message = "Expected element to be disabled, but it isn't a debug element " +
							  `(${element})`
				}
				else if(element.properties["disabled"] !== true){
					pass = false
					message = "Expected element to be disabled, but it isn't"
				}
				return {pass, message}		
			}	
		}
	},
	toContainText: () => {
		return {
			compare: <T>(actual : T, texts: string | string[]) => {
				let pass = true, message = ""
				
				if(typeof actual != 'string'){
					pass = false
					message = `Expected a ${typeof actual} to be a string.`
				}else for(let text of texts){
					if(!actual.includes(text)){
						pass = false
						message = `Expected "${actual}" to contain "${text}".`
					}
				}

				return {pass, message}
			}
		}
	}
}

beforeAll(() => {
    jasmine.addMatchers(customMatchers)
})