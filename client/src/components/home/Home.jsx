import React, { useEffect, useContext } from 'react';
import Banner from './Banner';
import Intro from './Intro';
import Features from './Features';
import BigProduct from './BigProduct';
import Products from './Products';
import Divider from './Divider';
import CartPopup from '../popups/CartPopup';
import ProductContext from '../../context/product/ProductContext';

const Home = () => {
    const { getProducts } = useContext(ProductContext);

    useEffect(() => {
        getProducts();
    }, []);

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