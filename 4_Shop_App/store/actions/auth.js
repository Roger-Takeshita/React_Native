import { FIREBASE_KEY } from 'react-native-dotenv';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                },
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message;

                switch (errorId) {
                    case 'EMAIL_EXISTS':
                        message = 'This email exists already!';

                        break;
                    default:
                        message = 'Something went wrong';

                        break;
                }

                throw new Error(message);
            }

            const resData = await response.json();

            dispatch({
                type: SIGNUP,
                token: resData.idToken,
                userId: resData.localId,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                },
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message;

                switch (errorId) {
                    case 'EMAIL_NOT_FOUND':
                        message = 'This email could not be found!';

                        break;
                    case 'INVALID_PASSWORD':
                        message = 'This password is not valid!';
                        break;
                    default:
                        message = 'Something went wrong';

                        break;
                }

                throw new Error(message);
            }

            const resData = await response.json();
            dispatch({
                type: LOGIN,
                token: resData.idToken,
                userId: resData.localId,
            });
        } catch (error) {
            throw error;
        }
    };
};
