import React, { useContext, useEffect } from 'react';

import ProductContext from '../../context/productContext/ProductContext';

const CartPopup = props => {
    const { showProductPopup, hideProduct } = useContext(ProductContext);

    useEffect(() => {
        if (showProductPopup) {
            document.getElementById('cart-popup-1').classList.add('active');
            document.getElementById('cart-popup-1').style.display = 'block';

            setTimeout(() => {
                document.getElementById('cart-popup-main').classList.add('active');
                document.getElementById('cart-popup-main').classList.add('fade-in-up');
            }, 200);
        } else {
            document.getElementById('cart-popup-1').classList.remove('active');
            document.getElementById('cart-popup-1').style.display = 'none';
            
            setTimeout(() => {
                document.getElementById('cart-popup-main').classList.remove('fade-in-up');
                document.getElementById('cart-popup-main').classList.remove('active');
            }, 200);
        }
    }, [showProductPopup])

    return (
        <>
            <div id="cart-popup-1" className="cart-popup-overlay">
                <div id="cart-popup-main" className="cart-popup">
                    <div className="container">
                        <div className="close-btn" onClick={() => hideProduct()}><i className="fa fa-times"></i></div>
                        <div className="item">
                            <div className="row">
                                <div className="col-lg-10 col-lg-push-1 col-md-12">
                                    <div className="row">
                                        <div className="item-profile col-md-4">
                                            <img src={props.image} alt="t-shirt" className="img-fluid" />
                                        </div>
                                        <div className="item-info col-md-8">
                                            <div className="item-info-wrapper">
                                                <h2 className="text-primary">{props.title}</h2>
                                                <p>{props.description}</p>
                                                <ul className="product-info list-unstyled">
                                                    <li className="size">
                                                        <select title="Choose Your Size" className="selectpicker1">
                                                            { props.size && <option value="small">Small</option> }
                                                            { props.size && <option value="medium">Medium</option> }
                                                            { props.size && <option value="large">Large</option> }
                                                            { props.size && <option value="x-large">X-Large</option> }
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <div className="product-quantity">
                                                            <div className="minus-btn"><i className="fa fa-plus"></i></div>
                                                            <input type="text" value="1" className="quantity" />
                                                            <div className="plus-btn"><i className="fa fa-minus"></i></div>
                                                        </div>
                                                    </li>
                                                    <li className="price">${props.price}</li>
                                                </ul>
                                            </div>
                                            <a href="#" className="add-to-cart btn btn-primary">add to cart <i className="fa fa-shopping-cart"></i></a>
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