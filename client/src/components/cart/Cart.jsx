import React from 'react';
import CartBanner from './CartBanner';
import CartProducts from './CartProducts';
import CartShipping from './CartShipping';

const Cart = () => {
    return (
        <>
            <div className="cart-page-holder">
                <CartBanner />
                <section className="cart">
                    <CartProducts />
                    <CartShipping />
                </section>
            </div>
        </>
    )
}

export default Cart;