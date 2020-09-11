import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';

import AuthContext from '../../context/auth/AuthContext';

const OrderDetails = props => {
    const { order_details, getOrderByOrderId } = useContext(AuthContext);

    const [ order, setOrder ] = useState({});

    useEffect(() => {
        getOrderByOrderId(props.orderId);
    }, [])

    useEffect(() => {
        setOrder(order_details);
    }, [ order_details ]);

    return (
        <>
            <div className="container mb-5">
            { Object.keys(order).length ?
                <>
                    <div className="row mt-5">
                        <div className="col-md-12 mb-5">
                            <h2>Order ID - {order.order_id}</h2>
                            <p>Order placed on { moment(order.created_at).format('DD MMM YYYY') }</p>
                        </div>
                    </div>
                    <hr />
                    <div className="cart-holder mb-5">
                        <div className="cart-heading mb-5">
                            <div className="row">
                                <div className="col-sm-6">Product</div>
                                <div className="col-sm-2">Price</div>
                                <div className="col-sm-2">Quantity</div>
                                <div className="col-sm-2">Total</div>
                            </div>
                            <hr />
                        </div>
                        <div className="cart-body">
                            { Object.keys(order).length && order.products.map((product, index) => {
                                return <React.Fragment key={index}>
                                    <div className='row mb-3'>
                                        <div className="col-sm-6">
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
                                        <div className="col-sm-2">
                                            <span><i className="fas fa-rupee-sign"></i>&nbsp;{product.price}</span>
                                        </div>
                                        <div className="col-sm-2">
                                            <span>{product.quantity}</span>
                                        </div>
                                        <div className="col-sm-2">
                                            <span><i className="fas fa-rupee-sign"></i>&nbsp;{parseInt(product.price) * parseInt(product.quantity)}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }) }
                        </div>
                        <hr />
                        <div className="total-price text-right mb-0">
                            <div className="container">
                                <div className='row mb-5'>
                                    <div className="col-sm-9">
                                        <span>Delivery Charges</span>
                                    </div>
                                    <div className="col-sm-3">
                                        <span><i className="fas fa-rupee-sign"></i>&nbsp;50</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="total-price text-right mb-0">
                            <div className="container">
                                <h3>Total:</h3>
                                <h2 className="text-primary">&nbsp;<i className="fas fa-rupee-sign"></i>&nbsp;{ order.total_price }</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card-holder">
                        <div className="card-heading">
                            <div className="row pt-5">
                                <div className="col-md-12">
                                    <h3>Addresses:</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pl-0 pr-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="pb-2">Invoice Address</h4>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Name: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ `${order.invoice_address.first_name} ${order.invoice_address.last_name}` }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Email: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ order.invoice_address.email }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Phone: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ order.invoice_address.phone }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Address: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-0">{ `${order.invoice_address.address1}, ${order.invoice_address.address2}` }</p>
                                            <p className="mb-0">{ `${order.invoice_address.city}, ${order.invoice_address.postal_code}` }</p>
                                            <p className="mb-0">{ `${order.invoice_address.region}, ${order.invoice_address.country}` }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="pb-2">Shipping Address</h4>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Name: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ `${order.shipping_address.first_name} ${order.shipping_address.last_name}` }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Email: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ order.shipping_address.email }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Phone: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-2">{ order.shipping_address.phone }</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span><strong>Address: </strong></span>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="mb-0">{ `${order.shipping_address.address1}, ${order.shipping_address.address2}` }</p>
                                            <p className="mb-0">{ `${order.shipping_address.city}, ${order.shipping_address.postal_code}` }</p>
                                            <p className="mb-0">{ `${order.shipping_address.region}, ${order.shipping_address.country}` }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer mt-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="float-left" style={{textTransform: 'capitalize'}}><strong>Order Status: </strong>{ order.order_status }</span>
                                    { order.order_status === 'shipped' && <span className="float-right">Shipped on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                    { order.order_status === 'delivered' && <span className="float-right">Delivered on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                    { order.order_status === 'refunded' && <span className="float-right">Refunded on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                    { order.order_status === 'cancelled' && <span className="float-right">Cancelled on { moment(order.updated_at).format('DD MMM YYYY') }</span> }
                                </div>
                            </div>
                        </div>

                    </div>
                </> : null}
            </div>
        </>
    )
}

export default OrderDetails;