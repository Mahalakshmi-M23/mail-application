import { GET_ALL_MAILS, GET_MAIL, ADD_MAIL, UPDATE_MAIL_STATUS, DELETE_ALL_MAILS } from '../constants.js';
import * as api from '../api/index.js';
import { toast } from 'react-toastify';

export const getAllMails = (history) => async(dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        console.log(token)
        if(!token) {
            history.push('/')
            return false;
        }

        const { data } = await api.getAllMails(token);

        dispatch({
            type: GET_ALL_MAILS,
            payload: data.data
        });
    } catch (error) {
        console.log(error.message);
    }

}

export const getMail = (history, id) => async(dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        if(!token) {
            history.push('/')
            return false;
        }
        console.log(id);
        const { data } = await api.getMail(token, id);

        dispatch({
            type: GET_MAIL,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }

}

export const addMail = (values, history) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        if(!token) {
            history.push('/')
            return false;
        }
        const { data } = await api.addMail(values);
        dispatch({
            type: ADD_MAIL,
            payload: data.data
        });
        toast("Message sent")
    } catch (error) {
        console.log(error.message);
    }
}

export const updateMail = (values, history) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        if(!token) {
            history.push('/')
            return false;
        }
        const data = await api.updateMail(values);
        
        console.log(data);
        dispatch({
            type: UPDATE_MAIL_STATUS,
            payload: data.data
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMail = (values, history) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        if(!token) {
            history.push('/')
            return false;
        }
        console.log(values);
        const { data } = await api.deleteMail(values);
        toast('Deleted Successfully!')
        dispatch({
            type: DELETE_ALL_MAILS,
            payload: data.data
        });
    } catch (error) {
        console.log(error.message);
    }
}

