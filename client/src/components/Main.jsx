import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Cart from './cart/Cart';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthContext from '../context/auth/AuthContext';
import Profile from './auth/Profile';
import Order from './order/Order';

const Main = () => {
    const { getCustomer, isLoggedIn } = useContext(AuthContext);

    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn) {
            getCustomer();
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 2000)
    });

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

                                case '/order':
                                    return <Order />

                                default: return
                            }
                        }
                    )()
                }
            <Footer />
            {(
                () => {
                    return !isLoggedIn ?
                    <>
                        <Login />
                        <Register />
                    </> :
                    <Profile />
                }
            )()}

        </>
    )
}

export default Main;