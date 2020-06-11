import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts,
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
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
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product) => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.productId,
                ),
            };
        default:
            return state;
    }
};

export default productsReducer;
