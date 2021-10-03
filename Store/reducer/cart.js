import { Add_To_Cart, Remove_From_Cart } from "../actions/cart";
import CartItem from "../../Models/addcartitem";
import { Add_Order } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
    items: {},
    Amount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Add_To_Cart:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productName = addedProduct.name;
            const productDescription = addedProduct.description;

            if (state.items[addedProduct.id]) {
                // already in cart
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productName,
                    state.items[addedProduct.id].sum + productPrice
                );
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem },
                    Amount: state.Amount + productPrice,
                };
            } else {
                const newCartItem = new CartItem(
                    1,
                    productPrice,
                    productName,
                    productPrice
                );
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: newCartItem },
                    Amount: state.Amount + productPrice,
                };
            }
        case Remove_From_Cart:
            let updatedCartItems;
            const currentproductQantity = state.items[action.pid].quantity;
            if (currentproductQantity > 1) {
                // In Cart
                const updatedCartItem = new CartItem(
                    state.items[action.pid].quantity - 1,
                    state.items[action.pid].productPrice,
                    state.items[action.pid].productName,
                    state.items[action.pid].sum - state.items[action.pid].productPrice
                );
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem };
            } else {
                updatedCartItems = {...state.items };
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                Amount: state.Amount - state.items[action.pid].productPrice,
            };
        case Add_Order:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = {...state.items };
            delete updatedItems[action.pid];
            const TTotal = state.Amount - state.items[action.pid].sum;
            return {
                ...state,
                items: updatedItems,
                Amount: TTotal,
            };
    }

    return state;
};