import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { CUSTOMER_REGISTER_SUCCESS, CUSTOMER_REGISTER_FAILED, CUSTOMER_LOGOUT } from '../../Types';

const AuthState = (props) => {
    const initialState = {
        customer: {},
        isLoggedIn: !!localStorage.getItem('token'),
        registerFormErrors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerCustomer = async userdata => {
        const errors_res = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        };

        try {
            const response = await axios.post('/customer/register', userdata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: CUSTOMER_REGISTER_SUCCESS,
                payload: {
                    customer: response.data,
                    errors: errors_res
                }
            });
        } catch(errors) {
            if (errors.response.status === 400) {
                errors.response.data.errors.forEach(error => {
                    errors_res[error.param] = error.msg
                });

                dispatch({
                    type: CUSTOMER_REGISTER_FAILED,
                    payload: errors_res
                });
            }
        }
    }

    const loginCustomer = () => {
        
    }

    const logoutCustomer = () => {
        dispatch({
            type: CUSTOMER_LOGOUT
        });
    }

    return (
        <>
            <AuthContext.Provider value={{
                isLoggedIn: state.isLoggedIn,
                customer: state.customer,
                registerFormErrors: state.registerFormErrors,
                registerCustomer,
                logoutCustomer
            }}>{props.children}</AuthContext.Provider>
        </>
    )
}

export default AuthState;