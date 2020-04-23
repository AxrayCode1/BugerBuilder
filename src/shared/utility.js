export const updatedObject = (oldObject, updtaedValues) => {
    return{
        ...oldObject,
        ...updtaedValues
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;            
    
    if(rules.required) {
        isValid = value.trim() !== '';            
    }

    if(isValid && rules.minLength) {
        isValid = value.length >= rules.minLength;
    }

    if(isValid && rules.maxLength) {
        isValid = value.length <= rules.maxLength;
    }

    if(isValid && rules.isEmail) {
        const pattern = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        isValid = pattern.test(value);
    }

    if(isValid && rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value);
    }
    
    return isValid;
}