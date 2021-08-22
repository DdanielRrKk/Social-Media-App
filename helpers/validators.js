export function ValidateEmpty(value){
    if(value === null || value === '') return true;
    return false;
}

export function ValidateMinLength(value, length){
    if(value.length <= length) return true;
    return false;
}

export function ValidateMaxLength(value, length){
    if(value.length >= length) return true;
    return false;
}

export function ValidateSpecialChars(value){
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(value)) return true;
    return false;
}

export function ValidateEmail(value){
    const format = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!format.test(value)) return true;
    return false;
}

export function ValidatePasswords(value1, value2){
    if(value1 !== value2) return true;
    return false;
}