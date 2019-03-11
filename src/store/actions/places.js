import { 
    ADD_PLACE,
    DELETE_PLACE
} from './actionTypes';

import {
    uiStartLoading,
    uiStopLoading
} from './index';

const URL = 'https://findplaces-1552244770863.firebaseio.com';

export const addPlace = (placeName, location, image) => {
    // return {
    //     type: ADD_PLACE,
    //     placeName,
    //     location,
    //     image
    // }
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-findplaces-1552244770863.cloudfunctions.net/storeImage", {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => dispatch(uiStopLoading()))
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };

            return fetch(`${URL}/places.json`, {
                method: 'POST',
                body: JSON.stringify(placeData)
            });
        })
        .catch(err => dispatch(uiStopLoading()))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
