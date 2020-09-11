import {
    ADD_ADDRESS,
    SET_STRIPE_CLIENT_SECRET
} from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return {
                ...state,
                shipping_address: action.payload.shipping_address
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