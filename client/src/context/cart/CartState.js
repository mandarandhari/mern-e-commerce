import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

import CartReducer from './CartReducer';
import CartContext from './CartContext';
import ProductContext from '../product/ProductContext';
import { 
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_FAILURE,
    GET_CART_PRODUCTS_SUCCESS,
    GET_CART_PRODUCTS_FAILURE
} from '../../Types';

const CartState = (props) => {
    const initialState = {
        cart: {}
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    const { showProductPopup, hideProduct } = useContext(ProductContext);

    const [ cookies, setCookie, removeCookie ] = useCookies(['cart_id']);

    const addToCart = async product => {
        let randomString = '';

        if (cookies.cart_id === undefined) {
            const charString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (var i = 32; i > 0; --i) {
                randomString += charString[Math.floor(Math.random() * charString.length)]
            };
            
            setCookie('cart_id', randomString, { maxAge: 3600 });
        }

        try {
            const response = await axios.post('/cart', {
                cart_id: cookies.cart_id !== undefined ? cookies.cart_id : randomString,
                product_id: product._id,
                size: product.size,
                quantity: product.quantity
            }, {
                'Content-Type': 'application/json'
            });

            if (showProductPopup) {
                hideProduct();
            }

            dispatch({
                type: ADD_TO_CART_SUCCESS,
                payload: response.data
            });

            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'Product added to cart',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            dispatch({
                type: ADD_TO_CART_FAILURE
            })
        }
    }

    const updateCart = async products => {
        const response = await axios.put('/cart/update/' + state.cart.cart_id, {
            products: products
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.products && response.data.products.length === 0) {
            removeCookie('cart_id');
            localStorage.removeItem('invoice_address');
            localStorage.removeItem('shipping_address');

            dispatch({
                type: GET_CART_PRODUCTS_SUCCESS,
                payload: {}
            });
        } else {
            dispatch({
                type: GET_CART_PRODUCTS_SUCCESS,
                payload: response.data
            });
        }

        if (showProductPopup) {
            hideProduct();
        }
    }

    const removeFromCart = async product__id => {
        try {
            const response = await axios.post(`/cart/delete/${state.cart.cart_id}`, {
                product_id: product__id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.products && response.data.products.length === 0) {
                removeCookie('cart_id');
                localStorage.removeItem('invoice_address');
                localStorage.removeItem('shipping_address');

                dispatch({
                    type: GET_CART_PRODUCTS_SUCCESS,
                    payload: {}
                });
            } else {
                dispatch({
                    type: GET_CART_PRODUCTS_SUCCESS,
                    payload: response.data
                });
            }
        } catch (e) {
            console.log(e.response);

            dispatch({
                type: REMOVE_FROM_CART_FAILURE
            });
        }
    }

    const getCartProducts = async () => {
        if (cookies.cart_id !== undefined) {
            try {
                const response = await axios.get('/cart/' + cookies.cart_id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.products && response.data.products.length === 0) {
                    removeCookie('cart_id');
                    localStorage.removeItem('invoice_address');
                    localStorage.removeItem('shipping_address');

                    dispatch({
                        type: GET_CART_PRODUCTS_SUCCESS,
                        payload: {}
                    });
                } else {
                    dispatch({
                        type: GET_CART_PRODUCTS_SUCCESS,
                        payload: response.data
                    });
                }
            } catch (error) {
                dispatch({
                    type: GET_CART_PRODUCTS_FAILURE
                });
            }
        }
    }

    return (
        <>
            <CartContext.Provider value={{
                cart: state.cart,
                addToCart,
                removeFromCart,
                getCartProducts,
                updateCart
            }}>
                {props.children}
            </CartContext.Provider>
        </>
    )
}

export default CartState;