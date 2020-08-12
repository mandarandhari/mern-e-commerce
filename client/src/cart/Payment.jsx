import React from 'react';

const Payment = () => {
    return (
        <>
            <div className="payment-method">
                <h3>Payment Method</h3>
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
                    <div className="col-sm-6">
                        <input type="text" name="cardname" placeholder="Name On Card" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="cardnumber" placeholder="Card Number" maxLength="14" required="" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="expirymonth" placeholder="Expiry Month" required="" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="expiryyear" placeholder="Expiry Year" required="" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="cvv" placeholder="CVV" maxLength="3" required="" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <button id="shipping-submit" type="submit" className="oder-now btn btn-primary btn-template btn-lg">Order Now <i className="fa fa-truck"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;