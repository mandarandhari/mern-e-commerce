const router = require('express').Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const auth = require(path.join(__dirname, './../middlewares/auth'));
const Cart = require(path.join(__dirname, './../models/Cart'));
const Order = require(path.join(__dirname, '../models/Order'));
const Countries = require(path.join(__dirname, '../models/Countries'));
const Customer = require(path.join(__dirname, '../models/Customer'));

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    }
});

router.post('/create_payment_intent', auth, async (req, res) => {
    const cart = await Cart.findOne({
        cart_id: req.body.cart_id
    });

    if (cart) {
        let price = 0;

        const country = await Countries.findOne({
            abbr: req.body.shipping_address.country
        });

        cart.products.forEach(product => {
            price = price + (parseInt(product.price) * parseInt(product.quantity));
        });

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
                country: country.name ? country.name : 'India'
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
            const order = await Order.findOneAndUpdate({
                order_id: req.body.order_id
            }, {
                transaction_id: req.body.transaction_id,
                payment_status: 'succeeded',
                order_status: 'pending'
            }, {
                new: true
            });

            const customer = await Customer.findById(order.customer_id);

            await Cart.deleteMany({
                cart_id: req.body.cart_id
            });

            ejs.renderFile(path.join(path.resolve(), '/emails/order.ejs'), 
            {
                order: order,
                frontend_url: process.env.FRONTEND_URL
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    var mainOptions = {
                        from: "'T-shirt store' shop@tshirtstore.com",
                        to: customer.email,
                        subject: 'Order placed',
                        html: data
                    };

                    transporter.sendMail(mainOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });

            ejs.renderFile(path.join(path.resolve(), '/emails/order_admin.ejs'), {
                order: order,
                customer: customer,
                frontend_url: process.env.FRONTEND_URL
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    var mainOptions = {
                        from: "'T shirt store' store@tshirtstore.com",
                        to: 'admin@tshirtstore.com',
                        subject: 'New order placed',
                        html: data
                    };

                    transporter.sendMail(mainOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            })
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