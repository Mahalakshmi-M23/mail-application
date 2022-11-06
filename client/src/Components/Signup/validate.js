const validate = values => {

    const errors = {}

    if (!values.firstName) {
      errors.firstName = '*Required'
    }

    if (!values.lastName) {
        errors.lastName = '*Required'
    }

    if (!values.email) {
        errors.email = '*Required'
    }
    
    if (!values.mobileNumber) {
      errors.mobileNumber = '*Required'
    }

    if (!values.password) {
      errors.password = '*Required'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = '*Required'
    }


    return errors;
}

export default validate;