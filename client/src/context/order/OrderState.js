import React, { useReducer } from 'react';

import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';

import {
    ADD_INVOICE_ADDRESS,
    HAS_DEFFERENT_SHIPPING_ADDRESS,
    ADD_SHIPPING_ADDRESS
} from '../../Types';

const OrderState = props => {
    const initialState = {
        invoice_address: {},
        shipping_address: {},
        hasDifferentShippingAddress: false
    }

    const [ state, dispatch ] = useReducer(OrderReducer, initialState);

    const addInvoiceAddress = address => {
        dispatch({
            type: ADD_INVOICE_ADDRESS,
            payload: address
        });
    }

    const addShippingAddress = address => {
        dispatch({
            type: ADD_SHIPPING_ADDRESS,
            payload: address
        })
    }

    const setDifferentShippingAddressVal = val => {
        dispatch({
            type: HAS_DEFFERENT_SHIPPING_ADDRESS,
            payload: val
        });
    }

    return (
        <>
            <OrderContext.Provider value={{
                invoice_address: state.invoice_address,
                shipping_address: state.shipping_address,
                hasDifferentShippingAddress: state.hasDifferentShippingAddress,
                addInvoiceAddress,
                addShippingAddress,
                setDifferentShippingAddressVal
            }}>
                {props.children}
            </OrderContext.Provider>
        </>
    )
}

export default OrderState;