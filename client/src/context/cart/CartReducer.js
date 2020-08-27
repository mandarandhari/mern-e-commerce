import {
    ADD_TO_CART_SUCCESS,
    GET_CART_PRODUCTS_SUCCESS,
    GET_CART_PRODUCTS_FAILURE,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_FAILURE
} from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
        case GET_CART_PRODUCTS_SUCCESS:
            return {
                ...state,
                cart: action.payload
            }

        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:
        case GET_CART_PRODUCTS_FAILURE:
            alert('Something went wrong');
            break

        default:
            return state;
    }
}