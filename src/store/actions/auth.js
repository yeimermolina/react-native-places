import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData) => {
    return dispatch => {
        console.log("AUTH", authData);
        dispatch(authSignup(authData));
    }
};

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCVeG4SFHzOWO9tOWJddFmFXKQmicBT2yQ`, {
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
            console.log("err", err);
            alert('Something Happened');
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (parsedRes.error) {
                alert("Authentication failed, try again!");
            } else {
                startMainTabs();
            }
        })
    };
}
