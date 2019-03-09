import { createStore, combineReducers } from 'redux';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

const store = () => {
    return createStore(rootReducer);
};

export default store;
