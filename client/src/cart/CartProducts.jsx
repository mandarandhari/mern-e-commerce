import React from 'react';

const CartProducts = () => {
    return (
        <>
            <div className="container">
                <div className="cart-holder">
                    <div className="cart-heading">
                        <div className="row">
                            <div className="col-sm-6">Product</div>
                            <div className="col-sm-2">Price</div>
                            <div className="col-sm-2">Quantity</div>
                            <div className="col-sm-2">Total</div>
                        </div>
                    </div>
                    <div className="cart-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="product-overview clearfix">
                                    <div className="product-img pull-left">
                                        <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/hero-shirt.jpg" alt="t-shirt" className="img-fluid" />
                                    </div>
                                    <div className="product-details pull-left">
                                        <h3>Elegant Gray</h3>
                                        <p>X-Large</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <h3>70.00$</h3>
                            </div>
                            <div className="col-sm-2">
                                <div className="product-quantity">
                                    <div className="minus-btn"><i className="fa fa-minus"></i></div>
                                    <input type="text" value="1" className="quantity" />
                                    <div className="plus-btn"><i className="fa fa-plus"></i></div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <h3>70.00$</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="total-price text-right">
                <div className="container">
                    <h3>Total:</h3>
                    <h2 className="text-primary">70.00$</h2>
                </div>
            </div>
        </>
    )
}

export default CartProducts;