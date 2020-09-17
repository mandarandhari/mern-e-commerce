import React from 'react';

const CartBanner = () => {
    return (
        <>
            <section className="hero pt-0 pb-0" style={{ background: `url(${require('./../../utils/img/cart-banner.jpg')}) no-repeat` }}>
                <div className="overlay" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '100px 0' }}>
                    <div className="container">
                        <h1 style={{ color: '#ffffff' }}>My Cart</h1>
                        <p className="lead" style={{ color: '#ffffff' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CartBanner;