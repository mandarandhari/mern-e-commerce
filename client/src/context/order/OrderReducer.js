import {
    ADD_ADDRESS,
    HAS_DEFFERENT_SHIPPING_ADDRESS,
    SET_STRIPE_CLIENT_SECRET
} from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return {
                ...state,
                invoice_address: action.payload.invoice_address,
                shipping_address: action.payload.shipping_address
            }

        case HAS_DEFFERENT_SHIPPING_ADDRESS:
            return {
                ...state,
                hasDifferentShippingAddress: action.payload
            }

        case SET_STRIPE_CLIENT_SECRET:
            return {
                ...state,
                stripe_client_secret: action.payload
            }
    
        default:
            return state;
    }
}