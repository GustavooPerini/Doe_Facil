declare namespace jasmine {
    
    interface Matchers<T> {
        /**
         * Expects a debugElement with the property disable set to true
         */
        elToBeDisabled(): boolean;
    }
}