import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

import OrderContext from '../../context/order/OrderContext';
import AuthContext from '../../context/auth/AuthContext';

const STRIPE_ELEMENT_STYLE ={
    padding: "0 20px",
    height: window.innerWidth < 800 ? '43px' : '60px',
    borderRadius: '10px',
    boxShadow: 'none',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontFamily: "'Open Sans', sans-serif"
}

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const [ cookies ] = useCookies();

    const { isLoggedIn } = useContext(AuthContext);
    const { stripe_client_secret, createPaymentIntent, placeOrder } = useContext(OrderContext);

    const [ clientSecret, setClientSecret ] = useState('');
    const [ cardHolderName, setCardHolderName ] = useState('');
    const [ cardHolderNameError, setCardHolderNameError ] = useState('');
    const [ cardErrors, setCardErrors ] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
    });
    const [ showSpinner, setShowSpinner ] = useState(false);

    useEffect(() => {
        if (!isLoggedIn || cookies.cart_id === undefined || (!!localStorage.getItem('shipping_address') && Object.keys(JSON.parse(localStorage.getItem('shipping_address'))).length === 0)) {
            history.push('/');
        } else {
            createPaymentIntent();
        }
    }, []);

    useEffect(() => {
        setClientSecret(stripe_client_secret);
    }, [stripe_client_secret])

    const orderNowBtnClicked = async e => {
        e.preventDefault();
        setCardHolderNameError('');

        if (!stripe || !elements) {
            return;
        }

        if (cardHolderName.length === 0) {
            setCardHolderNameError('Card holder name is required');
            return;
        }

        setShowSpinner(true);

        const cardElement = elements.getElement(CardNumberElement);

        const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: cardHolderName
                }
            }
        });

        if (confirmCardPayment.paymentIntent && confirmCardPayment.paymentIntent.status === 'succeeded') {
            placeOrder(confirmCardPayment.paymentIntent.payment_method);

            history.push('/');
        } else if (confirmCardPayment.error && confirmCardPayment.error.decline_code === 'insufficient_funds') {
            alert(confirmCardPayment.error.message);
        }

        setShowSpinner(false);
    }

    const cardholderNameChanged = e => {
        setCardHolderName(e.target.value);
    }

    const cardNumberElementChanged = e => {
        setCardErrors({
            ...cardErrors,
            cardNumber: ''
        });

        if (e.error) {
            setCardErrors({
                ...cardErrors,
                cardNumber: e.error.message
            });
        }
    }

    const cardExpiryChanged = e => {
        setCardErrors({
            ...cardErrors,
            cardExpiry: ''
        });

        if (e.error) {
            setCardErrors({
                ...cardErrors,
                cardExpiry: e.error.message
            });
        }
    }

    const cardCvvChanged = e => {
        setCardErrors({
            ...cardErrors,
            cardCvv: ''
        });

        if (e.error) {
            setCardErrors({
                ...cardErrors,
                cardCvv: e.error.message
            });
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
                                    <img src={require('./../../utils/img/visa.svg')} alt="visa" width="50" />
                                </li>
                                <li className="list-inline-item">
                                    <img src={require('./../../utils/img/mastercard.svg')} alt="mastercard" width="50" />
                                </li>
                                <li className="list-inline-item">
                                    <img src={require('./../../utils/img/amex.svg')} alt="amex" width="40" />
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <input type="text" name="cardname" placeholder="Name On Card" className="form-control" value={cardHolderName} onChange={cardholderNameChanged} />
                                { cardHolderNameError.length ? <p className="text-danger">{cardHolderNameError}</p> : null }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className={window.innerWidth < 800 ? "col-sm-6 col-md-12 ml-3 mr-3" : "col-sm-6 ml-3 mr-3"} style={STRIPE_ELEMENT_STYLE}>
                                        <CardNumberElement options={{
                                            iconStyle: 'solid',
                                            elements: {
                                                fonts: [{
                                                    family: 'Open Sans',
                                                    src: 'url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700)',
                                                    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
                                                    style: 'normal',
                                                    weight: '300',
                                                    display: 'swap',
                                                }],
                                            },
                                            style: {
                                                base: {
                                                    lineHeight: window.innerWidth < 800 ? '43px' : '60px',
                                                    fontSize: window.innerWidth < 800 ? '15px' : '16px',
                                                    fontWeight: 300,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'Card Number'
                                        }} onChange={cardNumberElementChanged} />
                                        { cardErrors.cardNumber.length ? <p className="text-danger">{cardErrors.cardNumber}</p> : null }
                                    </div>
                                    <div className={window.innerWidth < 800 ? "col-sm-6 col-md-12 ml-3 mr-3" : "col-sm-3 mr-3"} style={STRIPE_ELEMENT_STYLE}>
                                        <CardExpiryElement options={{
                                            style: {
                                                base: {
                                                    lineHeight: window.innerWidth < 800 ? '43px' : '60px',
                                                    fontSize: window.innerWidth < 800 ? '15px' : '16px',
                                                    fontWeight: 300,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'Expiry month & year'
                                        }} onChange={cardExpiryChanged} />
                                        { cardErrors.cardExpiry.length ? <p className="text-danger">{cardErrors.cardExpiry}</p> : null }
                                    </div>
                                    <div className={window.innerWidth < 800 ? "col-sm-6 col-md-12 ml-3 mr-3" : "col-sm-2"} style={STRIPE_ELEMENT_STYLE}>
                                        <CardCvcElement options={{
                                            style: {
                                                base: {
                                                    lineHeight: window.innerWidth < 800 ? '43px' : '60px',
                                                    fontSize: window.innerWidth < 800 ? '15px' : '16px',
                                                    fontWeight: 300,
                                                    color: '#495057',
                                                    fontFamily: '"Open Sans", sans-serif'
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            },
                                            placeholder: 'CVV'
                                        }} onChange={cardCvvChanged} />
                                        { cardErrors.cardCvv.length ? <p className="text-danger">{cardErrors.cardCvv}</p> : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={window.innerWidth < 800 ? "col-md-12 text-center" : "col-md-12 text-right"}>
                                <button id="shipping-submit" type="submit" className="oder-now btn btn-primary btn-template btn-lg" onClick={orderNowBtnClicked} disabled={ showSpinner ? `disabled` : false }>{ showSpinner ? <i className="fa fa-spinner fa-spin"></i> : null } Order Now <i className="fa fa-truck"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;