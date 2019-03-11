import { 
    SET_PLACES, DELETE_PLACE
} from './actionTypes';

import {
    uiStartLoading,
    uiStopLoading
} from './index';

const URL = 'https://findplaces-1552244770863.firebaseio.com';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-findplaces-1552244770863.cloudfunctions.net/storeImage", {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            alert("Something went wrong");
            dispatch(uiStopLoading());
        })
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
        .catch(err => {
            alert("Something went wrong");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places
    }
}

export const getPlaces = () => {
    return dispatch => {
        fetch(`${URL}/places.json`)
        .catch(err => {
            alert("Something went wrong");
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push(
                    {
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key
                    }
                )
            }
            dispatch(setPlaces(places));
        });
    }
}

const removePlace = key => {
    return {
        type: DELETE_PLACE,
        key
    }
}

export const deletePlace = (placeId) => {
    return dispatch => {
        fetch(`${URL}/places/${placeId}.json`, {
            method: 'DELETE'
        })
        .catch(err => {
            alert("Something went wrong");
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(removePlace(placeId));
        });
    }
}
