import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';
import CartItem from '../../models/cartItem';

const initialState = {
    items: {},
    totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }

            return {
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem,
                },
                totalAmount: state.totalAmount + productPrice,
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            let updatedCartItems;
            if (selectedCartItem.quantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice,
                );
                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice,
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.productId]) return state;
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.productId].sum;
            delete updatedItems[action.productId];

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal,
            };
        default:
            return state;
    }
};

export default cartReducer;
