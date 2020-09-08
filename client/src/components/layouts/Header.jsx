import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_e from '../../utils/img/logo-e.png';
import AuthContext from '../../context/auth/AuthContext';
import CartContext from '../../context/cart/CartContext';

const Header = () => {
    const { isLoggedIn, logoutCustomer, showLogin, showRegister, showProfile } = useContext(AuthContext);
    const { cart, getCartProducts } = useContext(CartContext);

    const [ productsCount, setProductsCount ] = useState(0);

    const location = useLocation();

    useEffect(() => {
        getCartProducts();
    }, []);

    useEffect(() => {
        if (cart.products && cart.products.length > 0) {
            setProductsCount(cart.products.length);
        } else {
            setProductsCount(0);
        }
    }, [cart, cart.products]);

    return (
        <>
            <header className="header">
                <div className="top-bar d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <p>Free Shipping on orders over 59$</p>
                            </div>
                            <div className="col-sm-6 text-right">
                                <p>Customer Service 456-532-342</p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a href="/#" className="navbar-brand">
                            <img src={logo_e} alt="Shirt Store" />
                        </a>
                        <button type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right">Menu<i className="fa fa-align-justify"></i></button>
                        <div id="navigation" className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className={ location.pathname === '/' ? "active" : ''}>
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className={ location.pathname === '/about-us' ? 'active' : '' }>
                                    <Link to="/about-us" className="nav-link">About</Link>
                                </li>
                                <li>
                                    <a href="/#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link langs"><i className="fa fa-cog"></i></a>
                                    <ul className="dropdown-menu">
                                    {(
                                        () => {
                                            return !isLoggedIn ? (
                                                <>
                                                    <li className="list-inline-item mr-0" style={{ width: '100%' }}>
                                                        <a href="/#" className="expand" onClick={e => {e.preventDefault();  showLogin()}}>Login</a>
                                                    </li>
                                                    <li className="list-inline-item" style={{ width: '100%' }}>
                                                        <a href="/#" className="expand" onClick={e => {e.preventDefault(); showRegister()}}>Register</a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="list-inline-item mr-0" style={{ width: '100%' }}>
                                                        <a href="/#" className="expand" onClick={e => {e.preventDefault(); showProfile()}}>My Account</a>
                                                    </li>
                                                    <li className="list-inline-item" style={{ width: '100%' }}>
                                                        <Link to="/my-orders">My Orders</Link>
                                                    </li>
                                                    <li className="list-inline-item" style={{ width: '100%' }}>
                                                        <a href="/#" onClick={() => logoutCustomer()}>Logout</a>
                                                    </li>
                                                </>
                                            )
                                        }
                                    )()}
                                    </ul>
                                </li>
                                <li className={ location.pathname === '/cart' || location.pathname === '/order' ? 'active' : '' }>
                                    <Link to="/cart" className="nav-link cart">
                                        <i className="fas fa-shopping-cart"></i>
                                        { productsCount > 0 ? <span className="items">{productsCount}</span> : null }
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;