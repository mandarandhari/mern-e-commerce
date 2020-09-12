import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AuthContext from '../../context/auth/AuthContext';

const MyOrders = () => {
    const { getOrders, myorders } = useContext(AuthContext);

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        setOrders(myorders);
    }, [myorders])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-5">
                        <h1>My Orders</h1>
                    </div>
                </div>
                { orders.length ? orders.map((order, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className="cart-holder mb-5" style={{ marginTop: i === 0 ? '60px' : '120px' }}>
                                <div className="cart-heading">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h4>Order ID - { order.order_id }</h4>
                                            <p>Order placed on { moment(order.created_at).format('DD MMM YYYY') }</p>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to={`/order/${order.order_id}`} className="btn btn-primary btn-md float-right">Order Details</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-body">
                                    <hr />
                                    <div className='row mb-3'>
                                        { order.products.map((product, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <div className={ index === 0 ? "col-sm-12" : "col-md-12 mt-4"}>
                                                        <div className="product-overview clearfix">
                                                            <div className="product-img float-left">
                                                                <img src={product.image_url} alt="t-shirt" className="img-fluid" style={{width: '150px'}} />
                                                            </div>
                                                            <div className="product-details float-left ml-5">
                                                                <h3>{product.title}</h3>
                                                                {product.size === 's' && <p>Small</p>}
                                                                {product.size === 'm' && <p>Medium</p>}
                                                                {product.size === 'l' && <p>Large</p>}
                                                                {product.size === 'xl' && <p>X-Large</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }) }
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="float-left" style={{textTransform: 'capitalize'}}><strong>Status: </strong>{ order.order_status }</span>
                                            { order.order_status === 'shipped' && <span className="float-right">Shipped on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                            { order.order_status === 'delivered' && <span className="float-right">Delivered on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                            { order.order_status === 'refunded' && <span className="float-right">Refunded on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                            { order.order_status === 'cancelled' && <span className="float-right">Cancelled on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }) : 
                <>
                    <p className="text-center mb-5">You haven't placed any order yet</p>
                </>}
            </div>
        </>
    )
}

export default MyOrders;