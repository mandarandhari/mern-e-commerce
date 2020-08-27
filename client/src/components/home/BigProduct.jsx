import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/product/ProductContext';
import CartContext from '../../context/cart/CartContext';

const BigProduct = () => {
    const { banner_product } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    const [productData, setProductData] = useState({});
    const [cartData, setCartData] = useState({
        size: '',
        quantity: 1,
        price: 0
    });

    useEffect(() => {
        setProductData({
            ...productData,
            _id: banner_product._id,
            title: banner_product.title,
            description: banner_product.description,
            size: banner_product.size,
            image_url: banner_product.image_url,
            price: banner_product.price
        });
    }, [banner_product]);

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

    const addProductToCart = (prod) => {        
        addToCart({
            _id: prod._id,
            size: cartData.size,
            quantity: cartData.quantity
        });
    }

    return (
        <>
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
                                    <li className="price">${cartData.price}</li>
                                </ul>
                            </div>
                            <a href="#" className="add-to-cart btn btn-primary" onClick={e => {e.preventDefault(); addProductToCart(productData)} }>add to cart <i className="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BigProduct;