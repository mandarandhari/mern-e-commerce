import React from 'react';
import Banner from './Banner';
import Intro from './Intro';
import Features from './Features';
import BigProduct from './BigProduct';
import Products from './Products';
import Divider from './Divider';
import NewArrivals from './NewArrivals';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import CartPopup from '../popups/CartPopup';

const Home = () => {
    return (
        <>
            <Header />
            <Banner />
            <Intro />
            <Features />
            <BigProduct />
            <Products />
            <Divider />
            <NewArrivals />
            <CartPopup />
            <Footer />
        </>
    )
}

export default Home;