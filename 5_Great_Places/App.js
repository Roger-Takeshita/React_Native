import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';
import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places';

init()
    .then(() => {
        console.log('Initializing database');
    })
    .catch((error) => {
        console.log('Initializing database failed');
        console.log(error);
    });

const rootReducer = combineReducers({
    places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
