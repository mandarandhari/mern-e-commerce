const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const auth = require('./../middlewares/auth');
const Cart = require('./../models/Cart');
const Order = require('../models/Order');

router.post('/create_payment_intent', auth, async (req, res) => {
    const cart = await Cart.findOne({
        cart_id: req.body.cart_id
    });

    if (cart) {
        let price = 0;

        await Order.create({
            order_id: req.body.order_id,
            customer_id: req.body.customer_id,
            products: cart.products,
            shipping_address: {
                first_name: req.body.shipping_address.firstName,
                last_name: req.body.shipping_address.lastName,
                email: req.body.shipping_address.email,
                phone: req.body.shipping_address.phone,
                address1: req.body.shipping_address.address1,
                address2: req.body.shipping_address.address2,
                city: req.body.shipping_address.city,
                postal_code: req.body.shipping_address.postalcode,
                region: req.body.shipping_address.region,
                country: req.body.shipping_address.country
            },
            total_price: price + 50
        });

        var customer = await stripe.customers.create({
            name: req.body.shipping_address.firstName + ' ' + req.body.shipping_address.lastName,
            email: req.body.shipping_address.email,
            phone: req.body.shipping_address.phone,
            address: {
                line1: req.body.shipping_address.address1,
                line2: req.body.shipping_address.address2,
                postal_code: req.body.shipping_address.postalcode,
                city: req.body.shipping_address.city,
                state: req.body.shipping_address.region,
                country: req.body.shipping_address.country
            }
        });

        let shipping_details = {
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

router.post('/place_order', auth, async (req, res) => {
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

router.get('/:customer_id/:order_id', auth, async (req, res) => {
    if ((req.params.order_id !== undefined || req.params.order_id.length) && (req.params.customer_id !== undefined || req.params.customer_id.length)) {
        const order = await Order.findOne({
            order_id: req.params.order_id,
            customer_id: req.params.customer_id,
            order_status: {
                $ne: null
            }
        }, {
            created_at: 1,
            invoice_address: 1,
            order_id: 1,
            order_status: 1,
            products: 1,
            shipping_address: 1,
            total_price: 1,
            updated_at: 1
        });

        if (order) {
            return res.status(200).json(order);
        } else {
            return res.status(500).json({
                msg: 'Something went wrong'
            });
        }
    } else {
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
});

module.exports = router;