import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

import Countries from './../../utils/data/Countries';
import CheckoutBanner from './CheckoutBanner';
import AuthContext from './../../context/auth/AuthContext';
import OrderContext from '../../context/order/OrderContext';

const Checkout = () => {
    const history = useHistory();

    const { customer } = useContext(AuthContext);
    const { invoice_address, hasDifferentShippingAddress, shipping_address, addAddresses, setDifferentShippingAddressVal } = useContext(OrderContext);

    const [ showShippingAddressForm, setShowShippingAddressForm ] = useState(false);

    let _invoice_address = {};
    let _shipping_address = {};

    if (!!localStorage.getItem('invoice_address')) {
        _invoice_address = JSON.parse(localStorage.getItem('invoice_address')); 
    }

    if (!!localStorage.getItem('shipping_address')) {
        _shipping_address = JSON.parse(localStorage.getItem('shipping_address'));
        setCheckboxChecked(true);
        setDifferentShippingAddressVal(true);
    }

    const [ invoiceAddress, setInvoiceAddress ] = useState({
        firstName: Object.keys(_invoice_address).length ? _invoice_address.firstName : '',
        lastName: Object.keys(_invoice_address).length ? _invoice_address.lastName : '',
        email: Object.keys(_invoice_address).length ? _invoice_address.email : '',
        phone: Object.keys(_invoice_address).length ? _invoice_address.phone : '',
        address1: Object.keys(_invoice_address).length ? _invoice_address.address1 : '',
        address2: Object.keys(_invoice_address).length ? _invoice_address.address2 : '',
        city: Object.keys(_invoice_address).length ? _invoice_address.city : '',
        postalcode: Object.keys(_invoice_address).length ? _invoice_address.postalcode : '',
        region: Object.keys(_invoice_address).length ? _invoice_address.region : '',
        country: Object.keys(_invoice_address).length ? _invoice_address.country : '',
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

    const [ checkboxChecked, setCheckboxChecked ] = useState(false);

    useEffect(() => {
        if (!!localStorage.removeItem('redirect_to')) {
            localStorage.removeItem('redirect_to');
        }
    }, []);

    useEffect(() => {
        setShowShippingAddressForm(hasDifferentShippingAddress);
    }, [hasDifferentShippingAddress]);

    useEffect(() => {
        setInvoiceAddress({
            ...invoiceAddress,
            firstName: invoice_address.firstName ? invoice_address.firstName : ( customer.firstName ? customer.firstName : invoiceAddress.firstName ),
            lastName: invoice_address.lastName ? invoice_address.lastName : ( customer.lastName ? customer.lastName : invoiceAddress.lastName ),
            email: invoice_address.email ? invoice_address.email : ( customer.email ? customer.email : invoiceAddress.email ),
            phone: invoice_address.phone ? invoice_address.phone : ( customer.phone ? customer.phone : invoiceAddress.phone ),
            address1: invoice_address.address1 ? invoice_address.address1 : invoiceAddress.address1,
            address2: invoice_address.address2 ? invoice_address.address2 : invoiceAddress.address2,
            city: invoice_address.city ? invoice_address.city : invoiceAddress.city,
            postalcode: invoice_address.postalcode ? invoice_address.postalcode : invoiceAddress.postalcode,
            region: invoice_address.region ? invoice_address.region : invoiceAddress.region,
            country: invoice_address.country ? invoice_address.country : invoiceAddress.country
        });
    }, [customer, invoice_address]);

    useEffect(() => {
        setShippingAddress({
            ...shippingAddress,
            firstName: shipping_address.firstName ? shipping_address.firstName : shippingAddress.firstName,
            lastName: shipping_address.lastName ? shipping_address.lastName : shippingAddress.lastName,
            email: shipping_address.email ? shipping_address.email : shippingAddress.email,
            phone: shipping_address.phone ? shipping_address.phone : shippingAddress.phone,
            address1: shipping_address.address1 ? shipping_address.address1 : shippingAddress.address1,
            address2: shipping_address.address2 ? shipping_address.address2 : shippingAddress.address2,
            city: shipping_address.city ? shipping_address.city : shippingAddress.city,
            postalcode: shipping_address.postalcode ? shipping_address.postalcode : shippingAddress.postalcode,
            region: shipping_address.region ? shipping_address.region : shippingAddress.region,
            country: shipping_address.country ? shipping_address.country : shippingAddress.country
        })
    }, [ shipping_address]);

    // useEffect(() => {
    //     setCheckboxChecked(true);
    //     setDifferentShippingAddressVal(true);
    // }, [_shipping_address]);

    const invoiceAddressFieldChanged = e => {
        setInvoiceAddress({
            ...invoiceAddress,
            [e.target.name]: e.target.value
        });
    }

    const shippingAddressCheckboxChecked = () => {
        const checked = !checkboxChecked;

        setCheckboxChecked(checked);
        setDifferentShippingAddressVal(checked);
    }

    const shippingAddressInputFieldChanged = e => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        })
    }

    const proceedToPaymentBtnClicked = async e => {
        e.preventDefault();

        let formValidation = true;
        let _shipping_address = {}
        let invoiceAddressErrors = {};
        let shippingAddressErrors = {};

        if (invoiceAddress.firstName.length === 0) {
            invoiceAddressErrors.firstName  = 'First name should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.lastName.length === 0) {
            invoiceAddressErrors.lastName = 'Last name should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.email.length === 0) {
            invoiceAddressErrors.email = 'Email should not be empty';
            formValidation = false;
        } else if (!invoiceAddress.email.match(/^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
            invoiceAddressErrors.email = 'Please enter valid email';
            formValidation = false;
        }

        if (invoiceAddress.phone.length === 0) {
            invoiceAddressErrors.phone = 'Phone number should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.address1.length === 0) {
            invoiceAddressErrors.address1 = 'Address should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.address2.length === 0) {
            invoiceAddressErrors.address2 = 'Address should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.city.length === 0) {
            invoiceAddressErrors.city = 'City should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.postalcode.length === 0) {
            invoiceAddressErrors.postalcode = 'Postal code should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.region.length === 0) {
            invoiceAddressErrors.region = 'Region/State should not be empty';
            formValidation = false;
        }

        if (invoiceAddress.country.length === 0) {
            invoiceAddressErrors.country = 'Please select a country';
            formValidation = false;
        }

        setInvoiceAddress({
            ...invoiceAddress,
            errors: {
                ...invoiceAddress.errors,
                firstName: invoiceAddressErrors.firstName ? invoiceAddressErrors.firstName : '',
                lastName: invoiceAddressErrors.lastName ? invoiceAddressErrors.lastName : '',
                email: invoiceAddressErrors.email ? invoiceAddressErrors.email: '',
                phone: invoiceAddressErrors.phone ? invoiceAddressErrors.phone : '',
                address1: invoiceAddressErrors.address1 ? invoiceAddressErrors.address1 : '',
                address2: invoiceAddressErrors.address2 ? invoiceAddressErrors.address2 : '',
                city: invoiceAddressErrors.city ? invoiceAddressErrors.city : '',
                postalcode: invoiceAddressErrors.postalcode ? invoiceAddressErrors.postalcode : '',
                region: invoiceAddressErrors.region ? invoiceAddressErrors.region : '',
                country: invoiceAddressErrors.country ? invoiceAddressErrors.country : ''
            }
        });

        if (hasDifferentShippingAddress) {
            _shipping_address = {
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
            }

            if (shippingAddress.firstName.length === 0) {
                shippingAddressErrors.firstName  = 'First name should not be empty';
                formValidation = false;
            }

            if (shippingAddress.lastName.length === 0) {
                shippingAddressErrors.lastName = 'Last name should not be empty';
                formValidation = false;
            }

            if (!shippingAddress.email.match(/^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
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

            setShippingAddress({
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
        }

        if (formValidation) {
            await addAddresses({
                firstName: invoiceAddress.firstName,
                lastName: invoiceAddress.lastName,
                email: invoiceAddress.email,
                phone: invoiceAddress.phone,
                address1: invoiceAddress.address1,
                address2: invoiceAddress.address2,
                city: invoiceAddress.city,
                postalcode: invoiceAddress.postalcode,
                region: invoiceAddress.region,
                country: invoiceAddress.country
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
                            <h3>Invoice Address</h3>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="text" name="firstName" placeholder="First Name" required="" className="form-control" value={invoiceAddress.firstName} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.firstName.length ? <p className="text-danger">{invoiceAddress.errors.firstName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="lastName" placeholder="Last Name" required="" className="form-control" value={invoiceAddress.lastName} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.lastName.length ? <p className="text-danger">{invoiceAddress.errors.lastName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="email" name="email" placeholder="Email Address" required="" className="form-control" value={invoiceAddress.email} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.email.length ? <p className="text-danger">{invoiceAddress.errors.email}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="phone" placeholder="Phone Number" required="" className="form-control" value={invoiceAddress.phone} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.phone.length ? <p className="text-danger">{invoiceAddress.errors.phone}</p> : null }
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="address1" placeholder="Address" required="" className="form-control" value={invoiceAddress.address1} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.address1.length ? <p className="text-danger">{invoiceAddress.errors.address1}</p> : null }
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" name="address2" placeholder="Apt, Suit, etc." required="" className="form-control" value={invoiceAddress.address2} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.address2.length ? <p className="text-danger">{invoiceAddress.errors.address2}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="city" placeholder="City" required="" className="form-control" value={invoiceAddress.city} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.city.length ? <p className="text-danger">{invoiceAddress.errors.city}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="postalcode" placeholder="Postal Code" required="" className="form-control" value={invoiceAddress.postalcode} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.postalcode.length ? <p className="text-danger">{invoiceAddress.errors.postalcode}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="region" placeholder="Region" required="" className="form-control" value={invoiceAddress.region} onChange={invoiceAddressFieldChanged} />
                                    { invoiceAddress.errors.region.length ? <p className="text-danger">{invoiceAddress.errors.region}</p> : null }
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
                                    }}  onChange={invoiceAddressFieldChanged} value={invoiceAddress.country}>
                                        <option value="">Select Country</option>
                                        {
                                            Countries.map((country, i) => {
                                                return <option value={country.abbr} key={i}>{country.name}</option>
                                            })
                                        }
                                    </select>
                                    { invoiceAddress.errors.country.length ? <p className="text-danger">{invoiceAddress.errors.country}</p> : null }
                                </div>
                                <div className="col-sm-12">
                                    <Checkbox checked={ checkboxChecked } color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={shippingAddressCheckboxChecked} />
                                    <label htmlFor="another-address" onClick={shippingAddressCheckboxChecked}>Different Shipping Address</label>
                                </div>
                            </div>
                        </div>
                        { showShippingAddressForm && 
                        <>
                        <div className="shipping-alternative">
                            <h3>Shipping Address</h3>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="text" name="firstName" placeholder="First Name" className="form-control" value={shippingAddress.firstName} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.firstName.length ? <p className="text-danger">{shippingAddress.errors.firstName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={shippingAddress.lastName} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.lastName.length ? <p className="text-danger">{shippingAddress.errors.lastName}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="email" name="email" placeholder="Email Address" className="form-control" value={shippingAddress.email} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.email.length ? <p className="text-danger">{shippingAddress.errors.email}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="phone" placeholder="Phone Number" className="form-control" value={shippingAddress.phone} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.phone.length ? <p className="text-danger">{shippingAddress.errors.phone}</p> : null }
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="address1" placeholder="Address" className="form-control" value={shippingAddress.address1} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.address1.length ? <p className="text-danger">{shippingAddress.errors.address1}</p> : null }
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" name="address2" placeholder="Apt, Suit, etc." className="form-control" value={shippingAddress.address2} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.address2.length ? <p className="text-danger">{shippingAddress.errors.address2}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="city" placeholder="City" className="form-control" value={shippingAddress.city} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.city.length ? <p className="text-danger">{shippingAddress.errors.city}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="postalcode" placeholder="Postal Code" className="form-control" value={shippingAddress.postalcode} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.postalcode.length ? <p className="text-danger">{shippingAddress.errors.postalcode}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" name="region" placeholder="Region" className="form-control" value={shippingAddress.region} onChange={shippingAddressInputFieldChanged} />
                                    { shippingAddress.errors.region.length ? <p className="text-danger">{shippingAddress.errors.region}</p> : null }
                                </div>
                                <div className="col-sm-6">
                                    <select name="country" title="Country" className="country form-control" style={{
                                            padding: '0 20px',
                                            height: '60px',
                                            lineHeight: '60px',
                                            borderRadius: '10px',
                                            fontSize: '1.2rem',
                                            fontWeight: 400,
                                            boxShadow: 'none'
                                        }} onChange={shippingAddressInputFieldChanged} value={shippingAddress.country}>
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
                        </> }
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