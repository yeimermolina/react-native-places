import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
    return dispatch => {
        console.log("AUTH", authData);
        dispatch(authSignup(authData));
    }
};

export const authSignup = (authData) => {
    return dispatch => {
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
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        })
    };
}
