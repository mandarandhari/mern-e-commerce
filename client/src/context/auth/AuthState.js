import React, { useReducer } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { 
    CUSTOMER_REGISTER_SUCCESS,
    CUSTOMER_REGISTER_FAILED,
    CUSTOMER_LOGIN_SUCCESS,
    CUSTOMER_LOGIN_FAILED,
    SHOW_LOGIN_POPUP,
    CUSTOMER_LOGOUT,
    HIDE_LOGIN_POPUP,
    SHOW_REGISTER_POPUP,
    HIDE_REGISTER_POPUP,
    CUSTOMER_GET_SUCCESS,
    CUSTOMER_GET_FAILURE,
    SHOW_PROFILE_POPUP,
    HIDE_PROFILE_POPUP,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    SET_MY_ORDERS,
    SET_ORDER_DETAILS,
    SHOW_FORGOT_PASSWORD_POPUP,
    HIDE_FORGOT_PASSWORD_POPUP,
    SET_FORGOT_PASSWORD_ERROR,
    SHOW_RESET_PASSWORD_POPUP,
    HIDE_RESET_PASSWORD_POPUP
} from '../../Types';

const AuthState = (props) => {
    const initialState = {
        customer: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            created_at: ''
        },
        myorders: [],
        order_details: {},
        isLoggedIn: !!localStorage.getItem('token'),
        registerFormErrors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        profileFormErrors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        loginFormErrors: {
            email: '',
            password: '',
            invalid: ''
        },
        forgotPasswordEmailError: '',
        passwordResetEmailSent: false,
        showRegisterPopup: false,
        showLoginPopup: false,
        showProfilePopup: false,
        showForgotPasswordPopup: false,
        showResetPasswordPopup: false,
        resetPasswordCustomerId: null
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
            const response = await axios.post('/register', userdata, {
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

            localStorage.setItem('customer', JSON.stringify(response.data.customer));

            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'You are registered',
                showConfirmButton: false,
                timer: 1500
            });

            return true;
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

            return false;
        }
    }

    const loginCustomer = async userdata => {
        const errors_res = {
            email: '',
            password: '',
            invalid: ''
        };

        try {
            const response = await axios.post('/login', {
                email: userdata.useremail,
                password: userdata.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: CUSTOMER_LOGIN_SUCCESS,
                payload: {
                    customer: response.data,
                    errors: errors_res
                }
            });

            localStorage.setItem('customer', JSON.stringify(response.data.customer));

            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'You are now logged in',
                showConfirmButton: false,
                timer: 1500
            });

            return true;
        } catch (errors) {
            if (errors.response.status === 400) {
                errors.response.data.errors.forEach(error => {
                    errors_res[error.param] = error.msg;
                });

                dispatch({
                    type: CUSTOMER_LOGIN_FAILED,
                    payload: errors_res
                });
            }

            return false;
        }
    }

    const updateCustomer = async userdata => {
        const errors_res = {
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            confirmPassword: ''
        };

        try {
            const response = await axios.post('/profile', {
                firstName: userdata.firstName,
                lastName: userdata.lastName,
                email: userdata.email,
                phone: userdata.phone,
                password: userdata.password,
                confirmPassword: userdata.confirmPassword
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data
            });

            localStorage.setItem('customer', JSON.stringify(response.data));

            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'Your profile has been updated',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (errors) {
            if (errors && errors.response.status === 400) {
                errors.response.data.errors.forEach(error => {
                    errors_res[error.param] = error.msg;
                });

                dispatch({
                    type: UPDATE_PROFILE_FAILURE,
                    payload: errors_res
                });
            }
        }
    }

    const logoutCustomer = () => {
        dispatch({
            type: CUSTOMER_LOGOUT
        });

        localStorage.removeItem('invoice_address');
        localStorage.removeItem('shipping_address');

        localStorage.removeItem('customer');

        Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'You are logged out',
            showConfirmButton: false,
            timer: 1500
        });

        return true;
    }

    const showLogin = () => {
        dispatch({
            type: SHOW_LOGIN_POPUP
        });
    }

    const showRegister = () => {
        dispatch({
            type: SHOW_REGISTER_POPUP
        })
    }

    const hideLogin = () => {
        dispatch({
            type: HIDE_LOGIN_POPUP
        });
    }

    const hideRegister = () => {
        dispatch({
            type: HIDE_REGISTER_POPUP
        })
    }

    const getCustomer = async () => {
        try {
            const response = await axios.get('/customer', {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: CUSTOMER_GET_SUCCESS,
                payload: response.data
            });

            localStorage.setItem('customer', JSON.stringify(response.data));
        } catch (errors) {
            if (errors.response.status === 401) {
                logoutCustomer();
            }

            dispatch({
                type: CUSTOMER_GET_FAILURE
            })
        }
    }

    const showProfile = () => {
        dispatch({
            type: SHOW_PROFILE_POPUP
        })
    }

    const hideProfile = () => {
        dispatch({
            type: HIDE_PROFILE_POPUP
        })
    }

    const showForgotPassword = () => {
        dispatch({
            type: SHOW_FORGOT_PASSWORD_POPUP
        });
    }

    const hideForgotPassword = () => {
        dispatch({
            type: HIDE_FORGOT_PASSWORD_POPUP
        });
    }

    const forgotPassword = async email => {
        try {
            const response = await axios.post('/reset-password', {
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Password reset email has been sent to you',
                    showConfirmButton: false,
                    timer: 1500
                })

                hideForgotPassword();
            } else {
                dispatch({
                    type: SET_FORGOT_PASSWORD_ERROR,
                    payload: response.data.errors[0].msg
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showResetPassword = async token => {
        try {
            const response = await axios.get('/reset-password/' + token, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                dispatch({
                    type: SHOW_RESET_PASSWORD_POPUP,
                    payload: response.data.customer_id
                });
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    const hideResetPassword = () => {
        dispatch({
            type: HIDE_RESET_PASSWORD_POPUP
        });
    }

    const resetPassword = async passwords => {
        try {
            const response = await axios.put('/reset-password', {
                id: state.resetPasswordCustomerId,
                password: passwords.password,
                confirmPassword: passwords.confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Password has been reset successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Something went wrong',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            hideResetPassword();
        } catch (error) {
            console.log(error);
        }
    }

    const getOrders = async () => {
        try {
            let customerId = state.customer.id.length ? state.customer.id : ( !!localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).id : '' );

            if (customerId.length) {
                const response = await axios.get('/my-orders/' + customerId, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                dispatch({
                    type: SET_MY_ORDERS,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getOrderByOrderId = async (order_id) => {
        try {
            let customerId = state.customer.id.length ? state.customer.id : ( !!localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).id : '' );

            if (customerId.length) {
                const response = await axios.get('/order/' + customerId + '/' + order_id, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                dispatch({
                    type: SET_ORDER_DETAILS,
                    payload: response.data
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AuthContext.Provider value={{
                isLoggedIn: state.isLoggedIn,
                customer: state.customer,
                myorders: state.myorders,
                order_details: state.order_details,
                registerFormErrors: state.registerFormErrors,
                loginFormErrors: state.loginFormErrors,
                registerCustomer,
                loginCustomer,
                logoutCustomer,
                showRegisterPopup: state.showRegisterPopup,
                showLoginPopup: state.showLoginPopup,
                showLogin,
                hideLogin,
                showRegister,
                hideRegister,
                getCustomer,
                showProfilePopup: state.showProfilePopup,
                profileFormErrors: state.profileFormErrors,
                showProfile,
                hideProfile,
                updateCustomer,
                getOrders,
                getOrderByOrderId,
                showForgotPasswordPopup: state.showForgotPasswordPopup,
                forgotPasswordEmailError: state.forgotPasswordEmailError,
                showForgotPassword,
                hideForgotPassword,
                forgotPassword,
                showResetPasswordPopup: state.showResetPasswordPopup,
                showResetPassword,
                hideResetPassword,
                resetPassword
            }}>{props.children}</AuthContext.Provider>
        </>
    )
}

export default AuthState;