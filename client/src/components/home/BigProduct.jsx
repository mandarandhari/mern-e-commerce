import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/productContext/ProductContext';

const BigProduct = () => {
    const { banner_product } = useContext(ProductContext);

    const[productData, setProductData] = useState({});

    useEffect(() => {
        setProductData({
            ...productData,
            title: banner_product.title,
            description: banner_product.description,
            size: banner_product.size,
            image_url: banner_product.image_url,
            price: banner_product.price
        });
    }, [banner_product]);

    return (
        <>
            <section className="big-product" id="big-product-view">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 product"><img src={productData.image_url} alt="t-shirt" className="img-fluid" /></div>
                        <div className="col-md-8 info">
                            <div className="info-wrapper">
                                <h2>{productData.title}</h2>
                                <p className="lead">{productData.description}</p>
                                <ul className="product-info list-unstyled">
                                    <li className="size">
                                        <select title="Choose Your Size" className="selectpicker1">
                                        {(
                                            () => {
                                                return productData.size && productData.size[0].s ? <option value="small">Small</option> : null 
                                            }
                                        )()}
                                        {(
                                            () => {
                                                return productData.size && productData.size[0].m ? <option value="medium">Medium</option> : null
                                            }
                                        )()}
                                        {(
                                            () => {
                                                return productData.size && productData.size[0].l ? <option value="large">Large</option> : null
                                            }
                                        )()}
                                        {(
                                            () => {
                                                return productData.size && productData.size[0].xl ? <option value="x-large">X-Large</option> : null
                                            }
                                        )()}
                                        </select>
                                    </li>
                                    <li className="size">
                                        <div className="product-quantity">
                                            <div className="minus-btn"><i className="fas fa-minus"></i></div>
                                            <input type="text" value="1" className="quantity" />
                                            <div className="plus-btn"><i className="fas fa-plus"></i></div>
                                        </div>
                                    </li>
                                    <li className="price">${productData.price}</li>
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