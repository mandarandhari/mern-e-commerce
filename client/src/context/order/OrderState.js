import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';
import CartContext from './../cart/CartContext';
import AuthContext from '../auth/AuthContext';

import {
    ADD_ADDRESS,
    SET_STRIPE_CLIENT_SECRET
} from '../../Types';

const OrderState = props => {
    const initialState = {
        shipping_address: {},
        stripe_client_secret: ''
    }

    const [ state, dispatch ] = useReducer(OrderReducer, initialState);

    const [ cookies, setCookie, removeCookie ] = useCookies(['order_id']);

    const [ _customer, set_customer ] = useState({});
    const [ _cart, set_cart ] = useState({});

    const { cart, getCartProducts } = useContext(CartContext);
    const { customer } = useContext(AuthContext);

    useEffect(() => {
        set_customer(customer);
    }, [ customer ]);

    useEffect(() => {
        set_cart(cart);
    }, [ cart ]);

    const addAddresses = shippingAddress => {
        localStorage.setItem('shipping_address', JSON.stringify(shippingAddress));

        dispatch({
            type: ADD_ADDRESS,
            payload: {
                shipping_address: shippingAddress
            }
        });
    }

    const createPaymentIntent = async () => {
        let orderId = '';
        const charString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (var i = 32; i > 0; --i) {
            orderId += charString[Math.floor(Math.random() * charString.length)]
        };

        setCookie('order_id', orderId);

        try {
            const response = await axios.post('/order/create_payment_intent', {
                cart_id: _cart.cart_id ? _cart.cart_id : cookies.cart_id,
                customer_id: _customer.id ? _customer.id : JSON.parse(localStorage.getItem('customer')).id,
                order_id: orderId,
                shipping_address: Object.keys(state.shipping_address).length ? state.shipping_address : JSON.parse(localStorage.getItem('shipping_address'))
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: SET_STRIPE_CLIENT_SECRET,
                payload: response.data.client_secret
            });

            return;
        } catch (error) {
            console.log(error.response);
            return error.response;
        };
    }

    const placeOrder = async payment_intent_id => {
        const response = await axios.post('/order/place_order', {
            transaction_id: payment_intent_id,
            order_id: cookies.order_id,
            cart_id: cookies.cart_id
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });

        if (response.status) {
            getCartProducts();
            removeCookie('cart_id');
            removeCookie('order_id');
            localStorage.removeItem('shipping_address');
        }

        Swal.fire({
            success: 'SUCCESS!',
            icon: 'success',
            text: 'You are order has been placed successfully',
            showConfirmButton: false,
            timer: 1500
        });

        return;
    }

    return (
        <>
            <OrderContext.Provider value={{
                shipping_address: state.shipping_address,
                stripe_client_secret: state.stripe_client_secret,
                addAddresses,
                createPaymentIntent,
                placeOrder
            }}>
                {props.children}
            </OrderContext.Provider>
        </>
    )
}

export default OrderState;