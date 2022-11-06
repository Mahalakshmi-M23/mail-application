const validate = values => {

    const errors = {}

    if (!values.receiverId) {
      errors.receiverId = '*Required'
    }
    if (!values.subject) {
       errors.subject = '*Required'
    }
    if (!values.message) {
    errors.message = '*Required'
    }

    return errors
}

export default validate;