import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import ProductContext from '../../context/product/ProductContext';
import CartContext from '../../context/cart/CartContext';

const BigProduct = () => {
    const { banner_product } = useContext(ProductContext);
    const { cart, addToCart, updateCart } = useContext(CartContext);

    const [productData, setProductData] = useState({});
    const [cartData, setCartData] = useState({
        size: '',
        quantity: 1,
        price: 0
    });

    const [ cartProducts, setCartProducts ] = useState([]);

    const [ isAlreadyAddedInCart, setIsAlreadyAddedInCart ] = useState(false);

    useEffect(() => {
        if (Object.keys(banner_product).length) {
            setProductData({
                ...productData,
                _id: banner_product._id,
                title: banner_product.title,
                description: banner_product.description,
                size: banner_product.size,
                image_url: banner_product.image_url,
                price: banner_product.price
            });
        }
    }, [banner_product]);

    useEffect(() => {
        setCartProducts(cart.products);
    }, [ cart.products ]);

    useEffect(() => {
        const defaultSize = productData && productData.size ? 
                                ( productData.size[0].s ? 's' : 
                                    ( productData.size[0].m ? 'm' : 
                                        ( productData.size[0].l ? 'l' : 
                                            ( productData.size[0].xl ? 'xl' : '')
                                        )
                                    )
                                ) : '';

        setCartData({
            ...cartData,
            size: defaultSize,
            price: parseInt(banner_product.price)
        });
    }, [productData])

    const handleSizeChange = e => {
        setCartData({
            ...cartData,
            size: e.target.value
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

    const plusBtnClicked = () => {
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

    const addProductToCart = async prod => {
        setIsAlreadyAddedInCart(false);

        if (cartProducts !== undefined) {
            let cartProductUpdated = false;
            let alreadyAddedInCart = false;
            let cartProductsArray = [];

            cartProducts.forEach(cartProduct => {
                if (cartProduct.product_id === prod._id) {
                    if (cartProduct.size === cartData.size) {
                        if (cartProduct.quantity === cartData.quantity) {
                            alreadyAddedInCart = true;
                        } else {
                            cartProductsArray.push({
                                ...cartProduct,
                                quantity: cartData.quantity
                            });

                            cartProductUpdated = true;
                        }
                    }
                } else {
                    cartProductsArray.push(cartProduct);
                }
            });

            await setIsAlreadyAddedInCart(alreadyAddedInCart);

            if (!alreadyAddedInCart) {
                if (cartProductUpdated) {
                    await updateCart(cartProductsArray);

                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product updated in the cart',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    addToCart({
                        _id: prod._id,
                        size: cartData.size,
                        quantity: cartData.quantity
                    });
                }
            }
        } else {
            addToCart({
                _id: prod._id,
                size: cartData.size,
                quantity: cartData.quantity
            });
        }
    }

    return (
        <>
            {Object.keys(productData).length ? (
            <section className="big-product" id="big-product-view">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 product">
                            <img src={productData.image_url} alt="t-shirt" className="img-fluid" />
                        </div>
                        <div className="col-md-8 info">
                            <div className="info-wrapper">
                                <h2>{productData.title}</h2>
                                <p className="lead">{productData.description}</p>
                                <ul className="product-info list-unstyled">
                                    <li className="size">
                                        <select name="size" title="Choose Your Size" className="selectpicker1" onChange={handleSizeChange}>
                                        {productData.size && productData.size[0].s && <option value="s">Small</option>}
                                        {productData.size && productData.size[0].m && <option value="m">Medium</option>}
                                        {productData.size && productData.size[0].l && <option value="l">Large</option>}
                                        {productData.size && productData.size[0].xl && <option value="xl">X-Large</option>}
                                        </select>
                                    </li>
                                    <li className="size">
                                        <div className="product-quantity">
                                            <div className="minus-btn" onClick={minusBtnClicked}><i className="fas fa-minus"></i></div>
                                            <input type="text" value={cartData.quantity} className="quantity" onChange={inputFieldChanged} />
                                            <div className="plus-btn" onClick={plusBtnClicked}><i className="fas fa-plus"></i></div>
                                        </div>
                                    </li>
                                    <li className="price"><i className="fas fa-rupee-sign"></i>&nbsp;{cartData.price}</li>
                                </ul>
                            </div>
                            { isAlreadyAddedInCart && <p className="text-danger mb-0">This product is already added in the cart</p>}
                            <a href="/#" className="add-to-cart btn btn-primary" onClick={e => {e.preventDefault(); addProductToCart(productData)} }>add to cart <i className="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </section>
            ) : null}
        </>
    )
}

export default BigProduct;