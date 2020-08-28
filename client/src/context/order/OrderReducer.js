import {
    ADD_INVOICE_ADDRESS,
    HAS_DEFFERENT_SHIPPING_ADDRESS,
    ADD_SHIPPING_ADDRESS
} from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case ADD_INVOICE_ADDRESS:
            return {
                ...state,
                invoice_address: action.payload
            }

        case ADD_SHIPPING_ADDRESS:
            return {
                ...state,
                shipping_address: action.payload
            }

        case HAS_DEFFERENT_SHIPPING_ADDRESS:
            return {
                ...state,
                hasDifferentShippingAddress: action.payload
            }
    
        default:
            return state;
    }
}