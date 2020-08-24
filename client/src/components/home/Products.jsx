import React, { useContext, useState, useEffect } from 'react';
import OwlCarousel  from 'react-owl-carousel';
import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import ProductContext from '../../context/productContext/ProductContext';
import CartPopup from '../popups/CartPopup';

const Products = () => {
    const { products, showProduct, showProductPopup } = useContext(ProductContext);

    const [productsData, setProductsData] = useState([]);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setProductsData(products);
    }, [products]);

    const handleExpandClickEvent = product => {
        setProductData(product);
        showProduct();
    }

    return (
        <>
            <section className="products">
                <div className="container text-center">
                    <h2 className="heading-center">Our Products</h2>
                    {
                        productsData.length && (
                            <OwlCarousel 
                                loop
                                className="owl-theme text-left products-slider"
                                nav
                                responsiveClass
                                responsive={
                                    {
                                        0: {
                                            items: 1,
                                            nav: true
                                        }, 
                                        600: {
                                            items: 3,
                                            nav: false
                                        },
                                        1000: {
                                            items: 4,
                                            nav: true,
                                            loop: false
                                        }
                                    }
                                }
                                navText={[
                                    "<i class='fa fa-angle-left'></i>",
                                    "<i class='fa fa-angle-right'></i>"
                                ]}
                                margin={20}
                            >
                            {productsData.map((product, index) => {
                                return (
                                    <>
                                        <div className="product" key={index}>
                                            <div className="item-image">
                                                <img src={product.image_url} alt="shirt" className="img-fluid mx-auto" />
                                                <div className="hover-overlay">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="cart">
                                                                <i className="fas fa-shopping-cart"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#" className="wishlist">
                                                                <i className="fa fa-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#" className="expand" onClick={e => {e.preventDefault(); handleExpandClickEvent(product)}}>
                                                                <i className="fa fa-expand-arrows-alt"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="clearfix">
                                                    <h5 className="pull-left">{product.title}</h5>
                                                    <span className="price pull-right">${product.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                            </OwlCarousel>
                        )
                    }
                </div>
            </section>
            {
                showProductPopup && <CartPopup 
                    image={productData.image_url}
                    title={productData.title}
                    description={productData.description}
                    price={productData.price}
                    size={productData.size && productData.size[0]}
                />
            }
            
        </>
    )
}

export default Products;