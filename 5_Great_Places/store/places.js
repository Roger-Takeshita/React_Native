const ADD_PLACE = 'ADD_PLACE';
import Place from '../models/place';

export const addPlace = (title) => {
    return {
        type: ADD_PLACE,
        placeData: {
            title,
        },
    };
};

const initialState = {
    places: [],
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(), action.placeData.title);
            return {
                places: state.places.concat(newPlace),
            };
        default:
            return state;
    }
};

export default placesReducer;
