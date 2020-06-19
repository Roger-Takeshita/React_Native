const ADD_PLACE = 'ADD_PLACE';
const SET_PLACES = 'SET_PLACES';
import * as FileSystem from 'expo-file-system';
import { fetchPlaces, insertPlace } from '../helpers/db';
import Place from '../models/place';

export const loadPlaces = () => {
    try {
        return async (dispatch) => {
            const dbResult = await fetchPlaces();
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array,
            });
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addPlace = (title, imageUri) => {
    return async (dispatch) => {
        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath,
            });

            const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3);

            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title,
                    imageUri: newPath,
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};

const initialState = {
    places: [],
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                places: action.places.map(
                    (place) => new Place(place.id.toString(), place.title, place.imageUri),
                ),
            };
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.imageUri,
            );
            return {
                places: state.places.concat(newPlace),
            };
        default:
            return state;
    }
};

export default placesReducer;
