import React, { useContext, useEffect, useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

import OrderContext from '../../context/order/OrderContext';

const STRIPE_ELEMENT_STYLE ={
    padding: "0 20px",
    height: '60px',
    borderRadius: '10px',
    boxShadow: 'none',
    backgroundColor: '#fff',
    border: '1px solid #ced4da'
}

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const { invoice_address, createPaymentIntent, placeOrder } = useContext(OrderContext);

    const [ clientSecret, setClientSecret ] = useState('');

    useEffect(() => {
        getPaymentIntent();
    }, []);

    const getPaymentIntent = async () => {
        const client_secret = await createPaymentIntent();

        setClientSecret(client_secret);
    };

    const orderNowBtnClicked = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: invoice_address.firstName + ' ' + invoice_address.lastName,
                    address: {
                        line1: invoice_address.address1,
                        line2: invoice_address.address2,
                        postal_code: invoice_address.postalcode,
                        city: invoice_address.city,
                        state: invoice_address.region,
                        country: invoice_address.country,
                    }
                }
            }
        });

        console.log(confirmCardPayment);

        if (confirmCardPayment.paymentIntent && confirmCardPayment.paymentIntent.status === 'succeeded') {
            placeOrder(confirmCardPayment.paymentIntent.payment_method);

            history.push('/');
        } else if (confirmCardPayment.error && confirmCardPayment.error.decline_code === 'insufficient_funds') {
            alert(confirmCardPayment.error.message);
        }
    }

    return (
        <>
            <div className="shipping container pb-5 pt-5">
                <div className="form-holder">
                    <div className="payment-method">
                        <div className="payment-method">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/visa.svg" alt="visa" width="50" />
                                </li>
                                <li className="list-inline-item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/mastercard.svg" alt="mastercard" width="50" />
                                </li>
                                <li className="list-inline-item">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/amex.svg" alt="amex" width="40" />
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <input type="text" name="cardname" placeholder="Name On Card" required="" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-sm-6 ml-3 mr-3" style={STRIPE_ELEMENT_STYLE}>
                                        <CardNumberElement options={{
                                            iconStyle: 'solid',
                                            style: {
                                                base: {
                                                    lineHeight: '60px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 400,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'Card Number'
                                        }} />
                                    </div>
                                    <div className="col-sm-3 mr-3" style={STRIPE_ELEMENT_STYLE}>
                                        <CardExpiryElement options={{
                                            style: {
                                                base: {
                                                    lineHeight: '60px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 400,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'Expiry month & year'
                                        }} />
                                    </div>
                                    <div className="col-sm-2" style={STRIPE_ELEMENT_STYLE}>
                                        <CardCvcElement options={{
                                            style: {
                                                base: {
                                                    lineHeight: '60px',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 400,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'CVV'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button id="shipping-submit" type="submit" className="oder-now btn btn-primary btn-template btn-lg" onClick={orderNowBtnClicked}>Order Now <i className="fa fa-truck"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;