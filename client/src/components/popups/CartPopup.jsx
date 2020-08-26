import React, { useContext, useEffect, useState } from 'react';

import ProductContext from '../../context/product/ProductContext';
import CartContext from '../../context/cart/CartContext';

const CartPopup = props => {
    const { showProductPopup, hideProduct } = useContext(ProductContext);
    const { cart, addToCart } = useContext(CartContext);

    const [ cartData, setCartData ] = useState({
        size: props && props.size ? 
                                ( props.size.s ? 's' : 
                                    ( props.size.m ? 'm' : 
                                        ( props.size.l ? 'l' : 
                                            ( props.size.xl ? 'xl' : '')
                                        )
                                    )
                                ) : '',
        quantity: 1,
        price: parseInt(props.price)
    });

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

    const addProductToCart = (productData) => {
        addToCart({
            _id: productData._id,
            size: cartData.size,
            quantity: cartData.quantity
        });
    }

    const minusBtnClicked = () => {
        if (cartData.quantity > 1) {
            setCartData({
                ...cartData,
                quantity: cartData.quantity - 1,
                price: cartData.price - (cartData.price / cartData.quantity)
            });
        }
    }

    const addBtnClicked = () => {
        setCartData({
            ...cartData,
            quantity: cartData.quantity + 1,
            price: cartData.price + (cartData.price / cartData.quantity)
        });
    }

    const inputFieldChanged = e => {
        if (parseInt(e.target.value) >= 1) {
            setCartData({
                ...cartData,
                quantity: parseInt(e.target.value),
                price: (cartData.price / cartData.quantity) * parseInt(e.target.value)
            });
        }
    }

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
                                                            { props.size && props.size.s && <option value="s">Small</option> }
                                                            { props.size && props.size.m && <option value="m">Medium</option> }
                                                            { props.size && props.size.l && <option value="l">Large</option> }
                                                            { props.size && props.size.xl && <option value="xl">X-Large</option> }
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <div className="product-quantity">
                                                            <div className="minus-btn" onClick={minusBtnClicked}>
                                                                <i className="fa fa-minus"></i>
                                                            </div>
                                                            <input type="text" value={cartData.quantity} className="quantity" onChange={inputFieldChanged} />
                                                            <div className="plus-btn" onClick={addBtnClicked}>
                                                                <i className="fa fa-plus"></i>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="price">${cartData.price}</li>
                                                </ul>
                                            </div>
                                            <a href="/#" className="add-to-cart btn btn-primary" onClick={e => {e.preventDefault(); addProductToCart(props)}}>add to cart <i className="fa fa-shopping-cart"></i></a>
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