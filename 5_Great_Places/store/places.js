const ADD_PLACE = 'ADD_PLACE';
const SET_PLACES = 'SET_PLACES';
import * as FileSystem from 'expo-file-system';
import ENV from '../env';
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

export const addPlace = (title, imageUri, location) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${
                ENV().googleApiKey
            }`,
        );

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();

        if (!resData.results) {
            throw new Error('Something went wrong');
        }

        const address = resData.results[0].formatted_address;
        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath,
            });

            const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);

            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title,
                    imageUri: newPath,
                    address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng,
                    },
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
                    (place) =>
                        new Place(
                            place.id.toString(),
                            place.title,
                            place.imageUri,
                            place.address,
                            place.lat,
                            place.lng,
                        ),
                ),
            };
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.imageUri,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
            );
            return {
                places: state.places.concat(newPlace),
            };
        default:
            return state;
    }
};

export default placesReducer;
