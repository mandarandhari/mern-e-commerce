import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../context/cart/CartContext';

const CartProducts = () => {
    const { cart } = useContext(CartContext);

    const [ productData, setProductData ] = useState([]);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        if (Object.keys(cart).length) {
            let totalPrice = 0;

            cart.products.forEach(p => {
                setProductData((prevData) => {
                    return [
                        ...prevData,
                        {
                            _id: p._id,
                            product_id: p.product_id,
                            quantity: p.quantity,
                            size: p.size,
                            title: p.title,
                            price: p.price,
                            image: p.image
                        }
                    ]
                });

                totalPrice = totalPrice + (p.price * p.quantity);
            });

            setTotal(totalPrice);
        }
    }, [cart]);

    const minusBtnClicked = cartProductId => {
        setProductData(prevData => {
            let newData = [];

            prevData.map(prevD => {
                let newObj = prevD;

                if (prevD._id === cartProductId && prevD.quantity > 1) {
                    newObj = {
                        ...newObj,
                        quantity: newObj.quantity - 1
                    }

                    setTotal(parseInt(total) - parseInt(prevD.price))
                }

                newData.push(newObj);
            });

            return newData;
        });
    }

    const inputFieldChanged = async (cartProductId, quantityValue) => {
        await setProductData(prevData => {
            let newData = [];

            prevData.map(prevD => {
                let newObj = prevD;

                if (prevD._id === cartProductId && parseInt(quantityValue) >= 1) {
                    newObj = {
                        ...newObj,
                        quantity: parseInt(quantityValue)
                    }
                }

                newData.push(newObj);
            });

            return newData;
        });

        let totalVal = 0;

        productData.forEach(p => {
            if (p._id === cartProductId) {
                totalVal = totalVal + (parseInt(p.price) * parseInt(quantityValue));
            } else {
                totalVal = totalVal + (parseInt(p.price) * parseInt(p.quantity));
            }
        });

        setTotal(totalVal);
    }

    const addBtnClicked = cartProductId => {
        setProductData(prevData => {
            let newData = [];

            prevData.map(prevD => {
                let newObj = prevD;

                if (prevD._id === cartProductId) {
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
                                <>
                                    <div className={i < productData.length - 1 ? `row mb-5` : 'row'}>
                                        <div className="col-sm-5">
                                            <div className="product-overview clearfix">
                                                <div className="product-img float-left">
                                                    <img src={product.image} alt="t-shirt" className="img-fluid" />
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
                                            <h3>${product.price}</h3>
                                        </div>
                                        <div className="col-sm-2">
                                            <div className="product-quantity">
                                                <div className="minus-btn"><i className="fa fa-minus" onClick={() => minusBtnClicked(product._id)}></i></div>
                                                <input type="text" value={product.quantity} className="quantity" onChange={e => inputFieldChanged(product._id, e.target.value)} />
                                                <div className="plus-btn"><i className="fa fa-plus" onClick={() => addBtnClicked(product._id)}></i></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <h3>${(product.price * product.quantity)}</h3>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-sm btn-primary" style={{ padding: '6px' }}><i className="fa fa-check"></i></button>
                                                </div>
                                                <div className="col-sm-12 mt-2">
                                                    <button className="btn btn-sm btn-danger" style={{ padding: '6px' }}><i className="fa fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="total-price text-right">
                <div className="container">
                    <h3>Total:</h3>
                    <h2 className="text-primary">${total}</h2>
                </div>
            </div>
        </>
    )
}

export default CartProducts;