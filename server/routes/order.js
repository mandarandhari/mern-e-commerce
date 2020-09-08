const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('./../models/Cart');
const Order = require('../models/Order');

router.post('/create_payment_intent', async (req, res) => {
    const cartItems = await Cart.aggregate([
        {
            $match: {
                cart_id: req.body.cart_id
            }
        }, {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'product'
            },
            
        }, {
            $unwind: '$product'
        }
    ]);

    if (cartItems) {
        let price = 0;
        let shipping_details = {};
        let _orderHasProducts = [];

        cartItems.forEach(cartItem => {
            price = price + (parseInt(cartItem.quantity) * parseInt(cartItem.product.price));

            _orderHasProducts.push({
                product_id: cartItem.product_id,
                quantity: parseInt(cartItem.quantity),
                size: cartItem.size,
                title: cartItem.product.title,
                description: cartItem.product.description,
                image_url: cartItem.product.image_url,
                price: parseInt(cartItem.product.price)
            })
        });

        await Order.create({
            order_id: req.body.order_id,
            customer_id: req.body.customer_id,
            products: _orderHasProducts,
            invoice_address: {
                first_name: req.body.invoice_address.firstName,
                last_name: req.body.invoice_address.lastName,
                email: req.body.invoice_address.email,
                phone: req.body.invoice_address.phone,
                address1: req.body.invoice_address.address1,
                address2: req.body.invoice_address.address2,
                city: req.body.invoice_address.city,
                postal_code: req.body.invoice_address.postalcode,
                region: req.body.invoice_address.region,
                country: req.body.invoice_address.country
            },
            shipping_address: {
                first_name: req.body.invoice_address.firstName,
                last_name: req.body.invoice_address.lastName,
                email: req.body.invoice_address.email,
                phone: req.body.invoice_address.phone,
                address1: req.body.invoice_address.address1,
                address2: req.body.invoice_address.address2,
                city: req.body.invoice_address.city,
                postal_code: req.body.invoice_address.postalcode,
                region: req.body.invoice_address.region,
                country: req.body.invoice_address.country
            },
            total_price: price + 50
        });

        var customer = await stripe.customers.create({
            name: req.body.invoice_address.firstName + ' ' + req.body.invoice_address.lastName,
            email: req.body.invoice_address.email,
            phone: req.body.invoice_address.phone,
            address: {
                line1: req.body.invoice_address.address1,
                line2: req.body.invoice_address.address2,
                postal_code: req.body.invoice_address.postalcode,
                city: req.body.invoice_address.city,
                state: req.body.invoice_address.region,
                country: req.body.invoice_address.country
            }
        });

        if (req.body.hasDifferentShippingAddress) {
            shipping_details = {
                name: req.body.shipping_address.firstName + ' ' + req.body.shipping_address.lastName,
                address: {
                    line1: req.body.shipping_address.address1,
                    line2: req.body.shipping_address.address2,
                    postal_code: req.body.shipping_address.postalcode,
                    city: req.body.shipping_address.city,
                    state: req.body.shipping_address.region,
                    country: req.body.shipping_address.country
                },
                phone: req.body.shipping_address.phone
            }
        } else {
            shipping_details = {
                name: req.body.invoice_address.firstName + ' ' + req.body.invoice_address.lastName,
                address: {
                    line1: req.body.invoice_address.address1,
                    line2: req.body.invoice_address.address2,
                    postal_code: req.body.invoice_address.postalcode,
                    city: req.body.invoice_address.city,
                    state: req.body.invoice_address.region,
                    country: req.body.invoice_address.country
                },
                phone: req.body.invoice_address.phone
            }
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: (price + 50) * 100,
            currency: 'inr',
            payment_method_types: ['card'],
            description: 'Purchasing T-shirt/s',
            customer: customer.id,
            shipping: shipping_details
        });
        
        res.json({
            client_secret: paymentIntent.client_secret
        });
    } else {
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
});

router.post('/place_order', async (req, res) => {
    try {
        if (req.body.transaction_id) {
            await Order.findOneAndUpdate({
                order_id: req.body.order_id
            }, {
                transaction_id: req.body.transaction_id,
                payment_status: 'succeeded',
                order_status: 'pending'
            });

            await Cart.deleteMany({
                cart_id: req.body.cart_id
            });
        } else {
            await Order.findOneAndUpdate({
                order_id: req.body.order_id
            }, {
                payment_status: 'failed'
            });
        }

        return res.status(200).json({
            status: true,
            msg: 'Order updated'
        });
    } catch (e) {
        console.log(e);

        return res.status(200).json({
            status: false,
            msg: 'Order updated'
        });
    }
});

module.exports = router;