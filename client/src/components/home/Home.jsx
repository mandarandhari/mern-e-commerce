import React, { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';

import Banner from './Banner';
import Intro from './Intro';
import Features from './Features';
import BigProduct from './BigProduct';
import Products from './Products';
import Divider from './Divider';
import CartPopup from '../popups/CartPopup';
import ProductContext from '../../context/product/ProductContext';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
    const { getProducts } = useContext(ProductContext);
    const { showResetPassword } = useContext(AuthContext);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get('token')) {
            showResetPassword(new URLSearchParams(window.location.search).get('token'));
        }
    }, [])

    return (
        <>
            <Banner />
            <Intro />
            <Features />
            <BigProduct />
            <Products />
            <Divider />
            <CartPopup />
        </>
    )
}

export default Home;