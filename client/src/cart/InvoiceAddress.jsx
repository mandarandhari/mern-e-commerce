import React from 'react';

const InvoiceAddress = () => {
    return (
        <>
            <div className="shipping-main">
                <h3>Invoice Address</h3>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" name="firstname" placeholder="First Name" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="lastname" placeholder="Last Name" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="email" name="email" placeholder="Email Address" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="number" placeholder="Phone Number" required="" className="form-control" />
                    </div>
                    <div className="col-sm-8">
                        <input type="text" name="address-1" placeholder="Address" required="" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="address-2" placeholder="Apt, Suit, etc." required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="city" placeholder="City" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="postalcode" placeholder="Postal Code" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" name="region" placeholder="Region" required="" className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <select name="country" title="Country" required="" className="country selectpicker">
                            <option value="">Afghanistan</option>
                            <option value="AX">Åland Islands</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AS">American Samoa</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="AR">Argentina</option>
                            <option value="AM">Armenia</option>
                            <option value="AW">Aruba</option>
                            <option value="AU">Australia</option>
                            <option value="AT">Austria</option>
                            <option value="AZ">Azerbaijan</option>
                            <option value="BS">Bahamas</option>
                            <option value="BH">Bahrain</option>
                        </select>
                    </div>
                    <div className="col-sm-12">
                        <input id="another-address" type="checkbox" />
                        <label htmlFor="another-address">Different Shipping Address</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceAddress;