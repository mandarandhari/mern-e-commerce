import React, { useContext, useEffect } from 'react';
import Home from './home/Home';
import About from './about/About';
import Cart from './cart/Cart';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthContext from '../context/auth/AuthContext';
import Profile from './auth/Profile';
import Checkout from './order/Checkout';
import Payment from './order/Payment';
import MyOrders from './auth/MyOrders';
import OrderDetails from './auth/OrderDetails';

const Main = props => {
    const { getCustomer, isLoggedIn, showRegisterPopup, showLoginPopup, showProfilePopup } = useContext(AuthContext);

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
                            switch (props.match.path) {
                                case '/':
                                    return <Home />

                                case '/about-us':
                                    return <About />

                                case '/cart':
                                    return <Cart />

                                case '/checkout':
                                    return <Checkout />

                                case '/payment':
                                    return <Payment />

                                case '/my-orders':
                                    return <MyOrders />

                                case '/order/:id':
                                    return <OrderDetails orderId={props.match.params.id} />

                                default: return
                            }
                        }
                    )()
                }
            <Footer />
            {showLoginPopup && <Login />}
            {showRegisterPopup && <Register />} 
            {showProfilePopup && <Profile />}
        </>
    )
}

export default Main;