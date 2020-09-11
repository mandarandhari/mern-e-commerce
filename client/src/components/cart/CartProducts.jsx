import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import CartContext from '../../context/cart/CartContext';
import AuthContext from '../../context/auth/AuthContext';

const CartProducts = () => {
    const { cart, removeFromCart, updateCart } = useContext(CartContext);
    const { isLoggedIn, showLogin } = useContext(AuthContext);

    const history = useHistory();

    const [ productData, setProductData ] = useState([]);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        setProductData([]);

        if (cart.products && cart.products.length) {
            let totalPrice = 0;

            cart.products.forEach(p => {
                setProductData((prevData) => {
                    return [
                        ...prevData,
                        {
                            product_id: p.product_id,
                            quantity: p.quantity,
                            size: p.size,
                            title: p.title,
                            description: p.description,
                            price: p.price,
                            image_url: p.image_url
                        }
                    ]
                });

                totalPrice = totalPrice + (p.price * p.quantity);
            });

            setTotal(totalPrice + 50);
        }
    }, [cart.products]);

    const minusBtnClicked = async cartProductId => {
        let deleteProduct = false;

        await setProductData(prevData => {
            let newData = [];

            prevData.map(prevD => {
                let newObj = prevD;

                if (prevD.product_id === cartProductId) {
                    if (prevD.quantity > 1) {
                        newObj = {
                            ...newObj,
                            quantity: newObj.quantity - 1
                        }

                        setTotal(parseInt(total) - parseInt(prevD.price))
                    } else {
                        deleteProduct = true;
                    }
                }

                newData.push(newObj);
            });

            return newData;
        });

        if (deleteProduct) {
            deleteProductBtnClicked(cartProductId)
        }
    }

    const inputFieldChanged = (cartProductId, quantityValue) => {
        if (parseInt(quantityValue) === 0) {
            deleteProductBtnClicked(cartProductId);
        } else {
            setProductData(prevData => {
                let newData = [];

                prevData.map(prevD => {
                    let newObj = prevD;

                    if (prevD.product_id === cartProductId && (parseInt(quantityValue) >= 1 || quantityValue === '')) {
                        newObj = {
                            ...newObj,
                            quantity: quantityValue === '' ? '' : parseInt(quantityValue)
                        }
                    }

                    newData.push(newObj);
                });

                return newData;
            });

            let totalVal = 0;

            productData.forEach(p => {
                if (p._id === cartProductId) {
                    const totalValue = quantityValue === '' ? 0 : (parseInt(p.price) * parseInt(quantityValue))
                    totalVal = parseInt(totalVal) + parseInt(totalValue);
                } else {
                    totalVal = totalVal + (parseInt(p.price) * parseInt(p.quantity));
                }
            });

            setTotal(totalVal + 50);
        }
    }

    const addBtnClicked = cartProductId => {
        setProductData(prevData => {
            let newData = [];

            prevData.map(prevD => {
                let newObj = prevD;

                if (prevD.product_id === cartProductId) {
                    newObj = {
                        ...newObj,
                        quantity: newObj.quantity + 1
                    };

                    setTotal(parseInt(total) + parseInt(prevD.price))
                }

                newData.push(newObj);
            });

            return newData;
        });
    }

    const deleteProductBtnClicked = productId => {
        Swal.fire({
            title: 'Remove from cart',
            icon: 'question',
            text: 'Are you sure you want to remove product from cart?',
            showConfirmButton: true,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(productId);
            }
        })
    }

    const checkoutBtnClicked = async () => {
        await updateCart(productData);

        if (isLoggedIn) {
            history.push('/checkout');
        } else {
            localStorage.setItem('redirect_to', '/checkout');
            showLogin();
        }
    }

    return (
        <>
            <div className="container">
                <div className="cart-holder">
                    <div className="cart-heading">
                        <div className="row">
                            <div className="col-sm-5">Product</div>
                            <div className="col-sm-2">Price</div>
                            <div className="col-sm-2">Quantity</div>
                            <div className="col-sm-2">Total</div>
                            <div className="col-sm-1"></div>
                        </div>
                    </div>
                    <div className="cart-body">
                    {
                        productData.length && productData.map((product, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <div className={i < productData.length - 1 ? `row mb-5` : 'row'}>
                                        <div className="col-sm-5">
                                            <div className="product-overview clearfix">
                                                <div className="product-img float-left">
                                                    <img src={product.image_url} alt="t-shirt" className="img-fluid" />
                                                </div>
                                                <div className="product-details float-left">
                                                    <h3>{product.title}</h3>
                                                    {product.size === 's' && <p>Small</p>}
                                                    {product.size === 'm' && <p>Medium</p>}
                                                    {product.size === 'l' && <p>Large</p>}
                                                    {product.size === 'xl' && <p>X-Large</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <h3><i className="fas fa-rupee-sign"></i>&nbsp;{product.price}</h3>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="product-quantity">
                                                <div className="minus-btn" onClick={() => minusBtnClicked(product.product_id)}><i className="fa fa-minus"></i></div>
                                                <input type="text" value={product.quantity} className="quantity" onChange={e => inputFieldChanged(product.product_id, e.target.value)} />
                                                <div className="plus-btn" onClick={() => addBtnClicked(product.product_id)}><i className="fa fa-plus"></i></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <h3><i className="fas fa-rupee-sign"></i>&nbsp;{(product.price * product.quantity)}</h3>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-sm btn-danger" style={{ padding: '6px' }} onClick={() => deleteProductBtnClicked(product.product_id)}><i className="fa fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="total-price text-right mb-0">
                <div className="container">
                    <div className='row mb-5'>
                        <div className="col-sm-9">
                            <h4>Delivery Charges</h4>
                        </div>
                        <div className="col-sm-3">
                            <h4><i className="fas fa-rupee-sign"></i>&nbsp;50</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="total-price text-right mb-0">
                <div className="container">
                    <h3>Total:</h3>
                    <h2 className="text-primary">&nbsp;<i className="fas fa-rupee-sign"></i>&nbsp;{total}</h2>
                </div>
            </div>
            <div className="total-price text-right">
                <div className="container">
                    <button className="btn btn-md btn-primary" onClick={checkoutBtnClicked}>Update cart and checkout</button>
                </div>
            </div>
        </>
    )
}

export default CartProducts;