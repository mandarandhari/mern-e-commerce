import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import CartBanner from './CartBanner';
import CartProducts from './CartProducts';
import CartShipping from './CartShipping';

const Cart = () => {
    return (
        <>
            <Header />
            <div className="cart-page-holder">
                <CartBanner />
                <section className="cart">
                    <CartProducts />
                    <CartShipping />
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Cart;