import React, { useContext, useState, useEffect } from 'react';

import Countries from './../../utils/data/Countries';
import OrderContext from '../../context/order/OrderContext';

const ShippingAddress = () => {
    const { shipping_address, addShippingAddress } = useContext(OrderContext);

    const [ shippingAddress, setShippingAddress ] = useState({
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

    useEffect(() => {
        setShippingAddress({
            ...shippingAddress,
            firstName: shipping_address.firstName ? shipping_address.firstName : '',
            lastName: shipping_address.lastName ? shipping_address.lastName : '',
            email: shipping_address.email ? shipping_address.email : '',
            phone: shipping_address.phone ? shipping_address.phone : '',
            address1: shipping_address.address1 ? shipping_address.address1 : '',
            address2: shipping_address.address2 ? shipping_address.address2 : '',
            city: shipping_address.city ? shipping_address.city : '',
            postalcode: shipping_address.postalcode ? shipping_address.postalcode : '',
            region: shipping_address.region ? shipping_address.region : '',
            country: shipping_address.country ? shipping_address.country : ''
        })
    }, [ shipping_address ]);

    const shippingAddressInputFieldChanged = e => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        })
    }

    const saveShippingAddress = () => {
        addShippingAddress(shippingAddress);
    }

    return (
        <>
            <div className="shipping-alternative">
                <h3>Shipping Address</h3>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" name="firstName" placeholder="First Name" className="form-control" value={shippingAddress.firstName} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={shippingAddress.lastName} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="email" name="email" placeholder="Email Address" className="form-control" value={shippingAddress.email} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="phone" placeholder="Phone Number" className="form-control" value={shippingAddress.phone} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-8">
                        <input type="text" name="address1" placeholder="Address" className="form-control" value={shippingAddress.address1} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="address2" placeholder="Apt, Suit, etc." className="form-control" value={shippingAddress.address2} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="city" placeholder="City" className="form-control" value={shippingAddress.city} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="postalcode" placeholder="Postal Code" className="form-control" value={shippingAddress.postalcode} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="region" placeholder="Region" className="form-control" value={shippingAddress.region} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress} />
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
                            }} onChange={shippingAddressInputFieldChanged} onBlur={saveShippingAddress}>
                                <option value="">Select Country</option>
                                {
                                    Countries.map((country, i) => {
                                        return <option value={country.name} key={i}>{country.name}</option>
                                    })
                                }
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingAddress;