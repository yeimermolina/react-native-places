import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

const store = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default store;
