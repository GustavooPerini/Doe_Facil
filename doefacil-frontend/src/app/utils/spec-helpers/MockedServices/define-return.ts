import { EachMethodVal } from "../type-helpers"


export interface DefineReturn<T, OPT> {
    /**Configures the return of the methods of the mock based on the object*/
    defineReturn(method: Partial<EachMethodVal<T, OPT>>) : any;
}