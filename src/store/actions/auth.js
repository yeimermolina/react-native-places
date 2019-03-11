import { AsyncStorage } from 'react-native';
import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyCVeG4SFHzOWO9tOWJddFmFXKQmicBT2yQ'

export const tryAuth = (authData, authMode) => {
    return (dispatch) => {
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
                dispatch(authStoreToken(parsedRes.idToken));
                startMainTabs();
            }
        })
    }
};

export const authStoreToken = token => {
    return dispatch => {
        dispatch(authSetToken(token));
        AsyncStorage.setItem("ap:auth:token", token);
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token) {
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        if(!tokenFromStorage) {
                            reject();
                            return;
                        }
                        dispatch(authSetToken(tokenFromStorage));
                        resolve(tokenFromStorage)
                    })
            } else {
                resolve(token);
            }
        })
        
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log('failed to fetch token'))
            
    }
}
