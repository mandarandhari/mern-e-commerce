import { 
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAILED,
    CUSTOMER_LOGIN_SUCCESS,
    CUSTOMER_LOGOUT,
    CUSTOMER_LOGIN_FAILED,
    SHOW_LOGIN_POPUP,
    HIDE_LOGIN_POPUP,
    SHOW_REGISTER_POPUP,
    HIDE_REGISTER_POPUP,
    CUSTOMER_GET_SUCCESS,
    SHOW_PROFILE_POPUP,
    HIDE_PROFILE_POPUP,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from "../../Types";

export default (state, action) => {
    switch (action.type) {
        case CUSTOMER_REGISTER_SUCCESS:
            console.log(action.payload);
            localStorage.setItem('token', action.payload.customer.token);

            return {
                ...state,
                isLoggedIn: !!localStorage.getItem('token'),
                customer: action.payload.customer.customer,
                registerFormErrors: action.payload.errors,
                showRegisterPopup: false
            }

        case CUSTOMER_REGISTER_FAILED:
            return {
                ...state,
                registerFormErrors: action.payload
            }

        case CUSTOMER_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.customer.token);

            return {
                ...state,
                isLoggedIn: !!localStorage.getItem('token'),
                customer: action.payload.customer.customer,
                loginFormErrors: action.payload.errors,
                showLoginPopup: false
            }

        case CUSTOMER_LOGIN_FAILED:
            return {
                ...state,
                loginFormErrors: action.payload
            }

        case SHOW_LOGIN_POPUP:
            return {
                ...state,
                showLoginPopup: true
            }

        case SHOW_REGISTER_POPUP:
            return {
                ...state,
                showRegisterPopup: true
            }

        case HIDE_LOGIN_POPUP:
            return {
                ...state,
                showLoginPopup: false
            }

        case HIDE_REGISTER_POPUP:
            return {
                ...state,
                showRegisterPopup: false
            }

        case CUSTOMER_GET_SUCCESS:
            return {
                ...state,
                customer: action.payload
            }

        case SHOW_PROFILE_POPUP:
            return {
                ...state,
                showProfilePopup: true
            }

        case HIDE_PROFILE_POPUP:
            return {
                ...state,
                showProfilePopup: false
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                customer: action.payload,
                showProfilePopup: false
            }

        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                profileFormErrors: action.payload
            }

        case CUSTOMER_LOGOUT:
            localStorage.removeItem('token');

            return {
                ...state,
                isLoggedIn: !!localStorage.getItem('token'),
                customer: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    created_at: ''
                }
            }

        default:
            return state;
    }
}