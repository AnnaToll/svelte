export const hasOnlyNumbers = (value) => {

    const hasOnlyNumbers = /^-?\d+$/.test(value)

    return hasOnlyNumbers ? parseInt(value) !== 0 : false
}


export const isValidUUID = (value) => {

    const UUIDRegEx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    
    return UUIDRegEx.test(value)
}


export const validateAndSetErrors = (details, type) => {

    details[type].errors = []

    if (type === 'amount') {

        if (details.amount.value === 0) {
            details[type].errors.push('0 is not a valid amount.')
        }
    
        if (details.amount.value !== 0 && !hasOnlyNumbers(details.amount.value)) {
            details[type].errors.push('Please enter amount in numbers.')
        }
    }
    
    if (type === 'accountId')  {

        if (!isValidUUID(details.accountId.value)) {
            details[type].errors.push('Account ID not valid.')
        }
    }

    return details
}


export const toSingleErrorArray = (details) => {

     return [
        ...details.accountId.errors, 
        ...details.amount.errors
    ]
}