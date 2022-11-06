import { GET_ALL_MAILS, GET_MAIL, ADD_MAIL, UPDATE_MAIL_STATUS, DELETE_ALL_MAILS } from '../constants.js';

const mail = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_MAILS:
            return {
                ...state,
                mailList: action.payload
            }
        case GET_MAIL: 
            return {
                ...state,
                mailList: action.payload
            }
        case ADD_MAIL:
            return {
                ...state,
                mailList: action.payload
            }
        case UPDATE_MAIL_STATUS:
            return {
                ...state,
                mailList: action.payload
            }
        case DELETE_ALL_MAILS:
            return {
                ...state,
                mailList: action.payload
            }
        default:
            return state;
    };
}

export default mail;