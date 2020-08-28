import React, { useContext, useEffect, useState } from 'react';

import OrderBanner from '../order/OrderBanner';
import InvoiceAddress from './InvoiceAddress';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import OrderContext from '../../context/order/OrderContext';

const Order = () => {
    const { hasDifferentShippingAddress } = useContext(OrderContext);

    const [ showShippingAddressForm, setShowShippingAddressForm ] = useState(false);

    useEffect(() => {
        setShowShippingAddressForm(hasDifferentShippingAddress);
    }, [hasDifferentShippingAddress])

    return (
        <>
            <OrderBanner />
            <div className="shipping container pb-5 pt-5">
                <div className="form-holder">
                    <form id="shipping-address-form" action="#" method="post">
                        <InvoiceAddress />
                        { showShippingAddressForm && <ShippingAddress />}
                        <Payment />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Order;