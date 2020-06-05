import PRODUCTS from '../../database/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product) => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.productId,
                ),
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.description,
                action.productData.imageUrl,
                action.productData.price,
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const productIdx = state.userProducts.findIndex((product) => product.id === action.productId);
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[productIdx].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIdx].price,
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIdx] = updatedProduct;
            const availableProductIdx = state.availableProducts.findIndex(
                (product) => product.id === action.productId,
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIdx] = updatedProduct;
            return {
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            };
        default:
            return state;
    }
};

export default productsReducer;
