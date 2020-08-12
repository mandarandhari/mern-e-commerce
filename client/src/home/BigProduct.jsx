import React from 'react';
import big_product from '../utils/img/big-product.jpg';

const BigProduct = () => {
    return (
        <>
            <section className="big-product">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 product"><img src={big_product} alt="t-shirt" className="img-fluid" /></div>
                        <div className="col-md-8 info">
                            <div className="info-wrapper">
                                <h2>Beautiful Pink</h2>
                                <p className="lead">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                    et dolore
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
                                    <li className="size">
                                        <div className="product-quantity">
                                            <div className="minus-btn"><i className="fas fa-minus"></i></div>
                                            <input type="text" value="1" className="quantity" />
                                            <div className="plus-btn"><i className="fas fa-plus"></i></div>
                                        </div>
                                    </li>
                                    <li className="price">70.00$</li>
                                </ul>
                            </div>
                            <a href="#" className="add-to-cart btn btn-primary">add to cart <i className="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BigProduct;