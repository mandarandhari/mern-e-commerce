import { CUSTOMER_REGISTER_SUCCESS, CUSTOMER_REGISTER_FAILED, CUSTOMER_LOGOUT } from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case CUSTOMER_REGISTER_SUCCESS:
            console.log(action.payload);
            localStorage.setItem('token', action.payload.customer.token);

            return {
                ...state,
                isLoggedIn: !!localStorage.getItem('token'),
                customer: action.payload.customer,
                registerFormErrors: action.payload.errors
            }

        case CUSTOMER_REGISTER_FAILED:
            return {
                ...state,
                registerFormErrors: action.payload
            }

        case CUSTOMER_LOGOUT:
            localStorage.removeItem('token');

            return {
                ...state,
                isLoggedIn: !!localStorage.getItem('token'),
                customer: {}
            }

        default:
            return state;
    }
}