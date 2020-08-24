import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    SHOW_PRODUCT_POPUP,
    HIDE_PRODUCT_POPUP
} from '../../Types';

const ProductState = (props) => {
    const initalState = {
        banner_product: {},
        products: [],
        showProductPopup: false,
        showProductDetails: {}
    }

    const [state, dispatch] = useReducer(ProductReducer, initalState);

    const getProducts = async () => {
        try {
            const response = await axios.get('/products', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_PRODUCTS_FAILURE
            });
        }
    }

    const showProduct = () => {
        dispatch({
            type: SHOW_PRODUCT_POPUP
        })
    }

    const hideProduct = () => {
        dispatch({
            type: HIDE_PRODUCT_POPUP
        })
    }

    return (
        <>
            <ProductContext.Provider value={{
                banner_product: state.banner_product,
                products: state.products,
                getProducts,
                showProductPopup: state.showProductPopup,
                showProduct,
                hideProduct,
                showProductDetails: state.showProductDetails
            }}>
                {props.children}
            </ProductContext.Provider>
        </>
    )
}

export default ProductState;