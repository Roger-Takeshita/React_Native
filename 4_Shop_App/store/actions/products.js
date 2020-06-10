import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        const response = await fetch(`https://react-native-7b3b3.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: DELETE_PRODUCT,
            productId,
        });
    };
};

export const fetchProducts = () => {
    try {
        return async (dispatch) => {
            const response = await fetch('https://react-native-7b3b3.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price,
                    ),
                );
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
            });
        };
    } catch (error) {
        //! Send to custom analytics server
        throw error;
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    try {
        return async (dispatch) => {
            //! Any async code here
            const response = await fetch('https://react-native-7b3b3.firebaseio.com/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, imageUrl, price }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            //! Dispatching an action to our redux
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price,
                },
            });
        };
    } catch (error) {
        throw error;
    }
};

export const updateProduct = (productId, title, description, imageUrl) => {
    try {
        return async (dispatch) => {
            const response = await fetch(
                `https://react-native-7b3b3.firebaseio.com/products/${productId}.json`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description, imageUrl }),
                },
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            dispatch({
                type: UPDATE_PRODUCT,
                productId,
                productData: {
                    title,
                    description,
                    imageUrl,
                },
            });
        };
    } catch (error) {
        throw error;
    }
};
