import { EachMethodVal } from "../type-helpers";

export interface Dispatch<T, OPT>{
     /**Dispatches the http response of the methods in the object*/
    dispatch(methods : Partial<EachMethodVal<T, OPT>>) :  any;
}