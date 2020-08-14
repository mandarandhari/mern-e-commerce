import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Cart from './cart/Cart';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Login from './auth/Login';
import Register from './auth/Register';

const Main = () => {
    const location = useLocation();

    return (
        <>
            <Header />
                {
                    (
                        () => {
                            switch (location.pathname) {
                                case '/':
                                    return <Home />

                                case '/about-us':
                                    return <About />

                                case '/cart':
                                    return <Cart />

                                default: return
                            }
                        }
                    )()
                }
            <Footer />
            <Login />
            <Register />
        </>
    )
}

export default Main;