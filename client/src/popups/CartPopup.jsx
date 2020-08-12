import React from 'react';

const CartPopup = () => {
    return (
        <>
            <div id="cart-popup-1" className="cart-popup-overlay">
                <div className="cart-popup">
                    <div className="container">
                        <div className="close-btn"><i className="icon-close"></i></div>
                        <div className="item">
                            <div className="row">
                                <div className="col-lg-10 col-lg-push-1 col-md-12">
                                    <div className="row">
                                        <div className="item-profile col-md-4">
                                            <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/f-shirt-cyan.jpg" alt="t-shirt" className="img-fluid" />
                                            <div className="labels"><span className="new">NEW</span><span className="sale">SALE</span></div>
                                        </div>
                                        <div className="item-info col-md-8">
                                            <div className="item-info-wrapper">
                                                <h2 className="text-primary">Elegant Cyan</h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem libero ullam assumenda
                                                    consequuntur illum reiciendis aliquid. Quaerat perspiciatis fugiat rerum, labore,
                                                    voluptates.
                                                </p>
                                                <ul className="product-info list-unstyled">
                                                    <li className="size">
                                                        <select title="Choose Your Size" className="selectpicker">
                                                            <option value="small">Small</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="large">Large</option>
                                                            <option value="x-large">X-Large</option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <div className="product-quantity">
                                                            <div className="minus-btn"><i className="icon-android-remove"></i></div>
                                                            <input type="text" value="1" className="quantity" />
                                                            <div className="plus-btn"><i className="icon-android-add"></i></div>
                                                        </div>
                                                    </li>
                                                    <li className="price">40.00$</li>
                                                </ul>
                                            </div>
                                            <a href="#" className="add-to-cart btn btn-primary">add to cart <i className="icon-cart-1"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPopup;