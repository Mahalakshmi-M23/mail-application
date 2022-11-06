import axios from 'axios';

const url = process.env.BACKEND_URL || 'http://localhost:4000/api';

//User
export const userSignup = (user) => axios.post(url + '/user/signup', user);
export const userLogin = (user) => axios.post(url + '/user/login', user);
export const getUser = (token) => axios.get(url + '/user/getUser', { headers: { 'Authorization': token } }).then(
    console.log(token)
);

//Mails
export const getAllMails = (token) => axios.get(url + '/mail/getAllMails', { headers: { 'Authorization': token } })
export const getMail = (token,id) => axios.get(url + '/mail/getMail', { headers: { 'Authorization': token }, params: { _id: id } }).then(
    console.log(id)
);
export const addMail = (data) => axios.post(url + '/mail/add', data);
export const updateMail = (data) => axios.put(url + '/mail/update', data)
export const deleteMail = (data) => axios.delete(url + '/mail/delete', { params: data}).then(
    console.log(data)
);