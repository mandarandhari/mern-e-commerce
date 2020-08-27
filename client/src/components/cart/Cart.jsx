import React, { useContext, useEffect, useState } from 'react';
import CartBanner from './CartBanner';
import CartProducts from './CartProducts';
import CartShipping from './CartShipping';
import CartContext from '../../context/cart/CartContext';

const Cart = () => {
    const { cart } = useContext(CartContext);

    const [ cartNotEmpty, setCartNotEmpty ] = useState(false);

    useEffect(() => {
        if (cart.products && cart.products.length) {
            setCartNotEmpty(true);
        } else {
            setCartNotEmpty(false);
        }
    }, [cart.products]);

    return (
        <>
            <div className="cart-page-holder">
                <CartBanner />
                <section className="cart">
                {(
                    () => {
                        if (cartNotEmpty) {
                            return (
                                <>
                                    <CartProducts />
                                    <CartShipping />
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <div className="text-center">
                                        <span>There is nothing in cart</span>
                                    </div>
                                </>
                            )
                        }
                    }
                )()}
                </section>
            </div>
        </>
    )
}

export default Cart;