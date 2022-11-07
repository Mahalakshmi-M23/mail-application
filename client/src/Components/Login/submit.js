import { getUser } from '../../actions/user';
import * as api from '../../api/index.js';

const submit = async(values, dispatch, props) => {
    try {
        const { history } = props;
        const { data } = await api.userLogin(values);
        // console.log(data )
        if (data.success) {
            localStorage.setItem('auth-token', JSON.stringify(data.token))
            dispatch(getUser(data.data))
            
            history.push('/getMails')
            
        }

    } catch (err) {
        console.log(err);
    }

}

export default submit;