import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import Countries from './../../utils/data/Countries';
import CheckoutBanner from './CheckoutBanner';
import AuthContext from './../../context/auth/AuthContext';
import OrderContext from '../../context/order/OrderContext';

const Checkout = () => {
    const history = useHistory();

    const { customer, isLoggedIn } = useContext(AuthContext);
    const { shipping_address, addAddresses } = useContext(OrderContext);

    const [ cookies ] = useCookies();

    let _shipping_address = {};

    if (!!localStorage.getItem('shipping_address')) {
        _shipping_address = JSON.parse(localStorage.getItem('shipping_address')); 
    }

    const [ shippingAddress, setShippingAddress ] = useState({
        firstName: Object.keys(_shipping_address).length ? _shipping_address.firstName : '',
        lastName: Object.keys(_shipping_address).length ? _shipping_address.lastName : '',
        email: Object.keys(_shipping_address).length ? _shipping_address.email : '',
        phone: Object.keys(_shipping_address).length ? _shipping_address.phone : '',
        address1: Object.keys(_shipping_address).length ? _shipping_address.address1 : '',
        address2: Object.keys(_shipping_address).length ? _shipping_address.address2 : '',
        city: Object.keys(_shipping_address).length ? _shipping_address.city : '',
        postalcode: Object.keys(_shipping_address).length ? _shipping_address.postalcode : '',
        region: Object.keys(_shipping_address).length ? _shipping_address.region : '',
        country: Object.keys(_shipping_address).length ? _shipping_address.country : '',
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            city: '',
            postalcode: '',
            region: '',
            country: ''
        }
    });

    useEffect(() => {
        if (!!localStorage.removeItem('redirect_to')) {
            localStorage.removeItem('redirect_to');
        }
    }, []);

    useEffect(() => {
        setShippingAddress({
            ...shippingAddress,
            firstName: shipping_address.firstName ? shipping_address.firstName : ( customer.firstName ? customer.firstName : shippingAddress.firstName ),
            lastName: shipping_address.lastName ? shipping_address.lastName : ( customer.lastName ? customer.lastName : shippingAddress.lastName ),
            email: shipping_address.email ? shipping_address.email : ( customer.email ? customer.email : shippingAddress.email ),
            phone: shipping_address.phone ? shipping_address.phone : ( customer.phone ? customer.phone : shippingAddress.phone ),
            address1: shipping_address.address1 ? shipping_address.address1 : shippingAddress.address1,
            address2: shipping_address.address2 ? shipping_address.address2 : shippingAddress.address2,
            city: shipping_address.city ? shipping_address.city : shippingAddress.city,
            postalcode: shipping_address.postalcode ? shipping_address.postalcode : shippingAddress.postalcode,
            region: shipping_address.region ? shipping_address.region : shippingAddress.region,
            country: shipping_address.country ? shipping_address.country : shippingAddress.country
        });
    }, [customer, shipping_address]);

    useEffect(() => {
        if (!isLoggedIn || cookies.cart_id === undefined) {
            history.push('/');
        }
    }, []);


    const shippingAddressFieldChanged = e => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        })
    }

    const proceedToPaymentBtnClicked = async e => {
        e.preventDefault();

        let formValidation = true;
        let shippingAddressErrors = {};

        if (shippingAddress.firstName.length === 0) {
            shippingAddressErrors.firstName  = 'First name should not be empty';
            formValidation = false;
        }

        if (shippingAddress.lastName.length === 0) {
            shippingAddressErrors.lastName = 'Last name should not be empty';
            formValidation = false;
        }

        if (shippingAddress.email.length === 0) {
            shippingAddressErrors.email = 'Email should not be empty';
            formValidation = false;
        } else if (!shippingAddress.email.match(/^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
            shippingAddressErrors.email = 'Please enter valid email';
            formValidation = false;
        }

        if (shippingAddress.phone.length === 0) {
            shippingAddressErrors.phone = 'Phone number should not be empty';
            formValidation = false;
        }

        if (shippingAddress.address1.length === 0) {
            shippingAddressErrors.address1 = 'Address should not be empty';
            formValidation = false;
        }

        if (shippingAddress.address2.length === 0) {
            shippingAddressErrors.address2 = 'Address should not be empty';
            formValidation = false;
        }

        if (shippingAddress.city.length === 0) {
            shippingAddressErrors.city = 'City should not be empty';
            formValidation = false;
        }

        if (shippingAddress.postalcode.length === 0) {
            shippingAddressErrors.postalcode = 'Postal code should not be empty';
            formValidation = false;
        }

        if (shippingAddress.region.length === 0) {
            shippingAddressErrors.region = 'Region/State should not be empty';
            formValidation = false;
        }

        if (shippingAddress.country.length === 0) {
            shippingAddressErrors.country = 'Please select a country';
            formValidation = false;
        }

        await setShippingAddress({
            ...shippingAddress,
            errors: {
                ...shippingAddress.errors,
                firstName: shippingAddressErrors.firstName ? shippingAddressErrors.firstName : '',
                lastName: shippingAddressErrors.lastName ? shippingAddressErrors.lastName : '',
                email: shippingAddressErrors.email ? shippingAddressErrors.email: '',
                phone: shippingAddressErrors.phone ? shippingAddressErrors.phone : '',
                address1: shippingAddressErrors.address1 ? shippingAddressErrors.address1 : '',
                address2: shippingAddressErrors.address2 ? shippingAddressErrors.address2 : '',
                city: shippingAddressErrors.city ? shippingAddressErrors.city : '',
                postalcode: shippingAddressErrors.postalcode ? shippingAddressErrors.postalcode : '',
                region: shippingAddressErrors.region ? shippingAddressErrors.region : '',
                country: shippingAddressErrors.country ? shippingAddressErrors.country : ''
            }
        });

        if (formValidation) {
            await addAddresses({
                firstName: shippingAddress.firstName,
                lastName: shippingAddress.lastName,
                email: shippingAddress.email,
                phone: shippingAddress.phone,
                address1: shippingAddress.address1,
                address2: shippingAddress.address2,
                city: shippingAddress.city,
                postalcode: shippingAddress.postalcode,
                region: shippingAddress.region,
                country: shippingAddress.country
            }, _shipping_address);

            history.push('/payment');
        }
    }

    return (
        <>
            <CheckoutBanner />
            <div className="shipping container pb-5 pt-5">
                <div className="form-holder">
                    <form id="shipping-address-form" action="#" method="post" onSubmit={proceedToPaymentBtnClicked}>
                        <div className="shipping-main">
                            <h3>Shipping Address</h3>
                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <input type="text" name="firstName" placeholder="First Name" required="" className="form-control" value={shippingAddress.firstName} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.firstName.length ? <p className="text-danger">{shippingAddress.errors.firstName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="lastName" placeholder="Last Name" required="" className="form-control" value={shippingAddress.lastName} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.lastName.length ? <p className="text-danger">{shippingAddress.errors.lastName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="email" name="email" placeholder="Email Address" required="" className="form-control" value={shippingAddress.email} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.email.length ? <p className="text-danger">{shippingAddress.errors.email}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="phone" placeholder="Phone Number" required="" className="form-control" value={shippingAddress.phone} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.phone.length ? <p className="text-danger">{shippingAddress.errors.phone}</p> : null }
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="address1" placeholder="Address" required="" className="form-control" value={shippingAddress.address1} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.address1.length ? <p className="text-danger">{shippingAddress.errors.address1}</p> : null }
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" name="address2" placeholder="Apt, Suit, etc." required="" className="form-control" value={shippingAddress.address2} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.address2.length ? <p className="text-danger">{shippingAddress.errors.address2}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="city" placeholder="City" required="" className="form-control" value={shippingAddress.city} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.city.length ? <p className="text-danger">{shippingAddress.errors.city}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="postalcode" placeholder="Postal Code" required="" className="form-control" value={shippingAddress.postalcode} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.postalcode.length ? <p className="text-danger">{shippingAddress.errors.postalcode}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="region" placeholder="Region" required="" className="form-control" value={shippingAddress.region} onChange={shippingAddressFieldChanged} />
                                    { shippingAddress.errors.region.length ? <p className="text-danger">{shippingAddress.errors.region}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <select name="country" title="Country" required="" className="country form-control" style={{
                                        padding: '0 20px',
                                        height: '60px',
                                        lineHeight: '60px',
                                        borderRadius: '10px',
                                        fontSize: '1.2rem',
                                        fontWeight: 400,
                                        boxShadow: 'none'
                                    }}  onChange={shippingAddressFieldChanged} value={shippingAddress.country}>
                                        <option value="">Select Country</option>
                                        {
                                            Countries.map((country, i) => {
                                                return <option value={country.abbr} key={i}>{country.name}</option>
                                            })
                                        }
                                    </select>
                                    { shippingAddress.errors.country.length ? <p className="text-danger">{shippingAddress.errors.country}</p> : null }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button className="btn btn-lg btn-primary" onClick={proceedToPaymentBtnClicked}>Proceed to Payment <i className="fa fa-money-check"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Checkout;