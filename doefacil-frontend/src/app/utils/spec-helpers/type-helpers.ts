/** An object with methods of T as its keys and all values with OPT type.*/
export type MethodVal<T, OPT> =  {
    [K in MethodOf<T>]: OPT
}

/**All the keys of T that are a method*/
export type MethodOf<T> = keyof {
    [K in keyof T as T[K] extends Function ? K : never] : unknown
}

/** The overlap between the keys A and the keys B */
export type KeysInBoth<A extends keyof any, B extends keyof any> = keyof {
    [K in (A & B)] : unknown
}

/**Like Partial but is applied to all objects inside the orginal */
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/*An object with methods of T as its keys, each key have the OPT[Key] type.*/
export type EachMethodVal<T, OPT> = {
    [K in KeysInBoth<MethodOf<T>, keyof OPT> ]: OPT[K]
}