import React, { useState, useContext, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

import Countries from './../../utils/data/Countries';
import AuthContext from './../../context/auth/AuthContext';
import OrderContext from '../../context/order/OrderContext';

const InvoiceAddress = () => {
    const { customer } = useContext(AuthContext);
    const { invoice_address, addInvoiceAddress, setDifferentShippingAddressVal } = useContext(OrderContext);

    const [ invoiceAddress, setAddress ] = useState({
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
    });

    const [ checkboxChecked, setCheckboxChecked ] = useState(false);

    useEffect(() => {
        setAddress({
            ...invoiceAddress,
            firstName: invoice_address.firstName ? invoice_address.firstName : customer.firstName,
            lastName: invoice_address.lastName ? invoice_address.lastName : customer.lastName,
            email: invoice_address.email ? invoice_address.email : customer.email,
            phone: invoice_address.phone ? invoice_address.phone : customer.phone,
            address1: invoice_address.address1 ? invoice_address.address1 : '',
            address2: invoice_address.address2 ? invoice_address.address2 : '',
            city: invoice_address.city ? invoice_address.city : '',
            postalcode: invoice_address.postalcode ? invoice_address.postalcode : '',
            region: invoice_address.region ? invoice_address.region : '',
            country: invoice_address.country ? invoice_address.country : ''
        });
    }, [customer, invoice_address]);

    const invoiceAddressFieldChanged = e => {
        setAddress({
            ...invoiceAddress,
            [e.target.name]: e.target.value
        });
    }

    const saveInvoiceDetails = () => {
        addInvoiceAddress(invoiceAddress);
    }

    const shippingAddressCheckboxChecked = () => {
        const checked = !checkboxChecked;

        setCheckboxChecked(checked);
        setDifferentShippingAddressVal(checked);
    }

    return (
        <>
            <div className="shipping-main">
                <h3>Invoice Address</h3>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" name="firstName" placeholder="First Name" required="" className="form-control" value={invoiceAddress.firstName} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="lastName" placeholder="Last Name" required="" className="form-control" value={invoiceAddress.lastName} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="email" name="email" placeholder="Email Address" required="" className="form-control" value={invoiceAddress.email} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="phone" placeholder="Phone Number" required="" className="form-control" value={invoiceAddress.phone} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-8">
                        <input type="text" name="address1" placeholder="Address" required="" className="form-control" value={invoiceAddress.address1} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="address2" placeholder="Apt, Suit, etc." required="" className="form-control" value={invoiceAddress.address2} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="city" placeholder="City" required="" className="form-control" value={invoiceAddress.city} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="postalcode" placeholder="Postal Code" required="" className="form-control" value={invoiceAddress.postalcode} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="region" placeholder="Region" required="" className="form-control" value={invoiceAddress.region} onChange={invoiceAddressFieldChanged} onBlur={saveInvoiceDetails} />
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
                        }}  onChange={invoiceAddressFieldChanged}  onBlur={saveInvoiceDetails}>
                            <option value="">Select Country</option>
                            {
                                Countries.map((country, i) => {
                                    return <option value={country.name} key={i}>{country.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-sm-12">
                    <Checkbox checked={ checkboxChecked } color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} onClick={shippingAddressCheckboxChecked} />
                        <label htmlFor="another-address">Different Shipping Address</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceAddress;