import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user.js';
import mail from './mail.js';

export const reducers = combineReducers({
    form: formReducer,
    user,
    mail
});