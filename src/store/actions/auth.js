import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyCVeG4SFHzOWO9tOWJddFmFXKQmicBT2yQ'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
        if (authMode === 'login') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
        } 
        fetch(`${url}?key=${API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            alert('Something Happened');
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (parsedRes.error || !parsedRes.idToken) {
                alert("Authentication failed, try again!");
            } else {
                dispatch(authSetToken(parsedRes.idToken));
                startMainTabs();
            }
        })
    }
};

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}
