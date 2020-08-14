import React from 'react';
import InvoiceAddress from './InvoiceAddress';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';

const CartShipping = () => {
    return (
        <>
            <div className="shipping container">
                <div className="form-holder">
                    <form id="shipping-address-form" action="#" method="post">
                        <InvoiceAddress />
                        <ShippingAddress />
                        <Payment />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CartShipping;