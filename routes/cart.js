const router = require('express').Router();
const mongoose = require('mongoose');

const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
    try {
        const product = await Product.findById(req.body.product_id);

        if (product) {
            const cart = await Cart.findOne({
                cart_id: req.body.cart_id
            });

            const products_arr = [];

            if (cart === null) {
                await Cart.create({
                    cart_id: req.body.cart_id,
                    created_at: Date.now()
                });
            } else {
                cart.products.forEach(old_product => {
                    products_arr.push(old_product);
                });
            }

            products_arr.push({
                product_id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                image_url: product.image_url,
                size: req.body.size,
                quantity: req.body.quantity
            });

            const updated_cart = await Cart.findOneAndUpdate({
                cart_id: req.body.cart_id
            }, {
                products: products_arr,
                updated_at: Date.now()
            }, {
                new: true
            });

            return res.status(200).json({
                cart_id: req.body.cart_id,
                products: updated_cart.products
            });
        } else {
            return res.status(400).json({
                msg: 'Something went wrong'
            });
        }
    } catch (e) {
        console.log(e);

        return res.status(400).json({
            msg: 'Something went wrong'
        });
    }
});

router.get('/:cart_id', async (req, res) => {
    try {
        const cart = await Cart.findOne({
            cart_id: req.params.cart_id
        });

        if (cart) {
            let products_arr_ids = [];

            cart.products.forEach(prod => {
                products_arr_ids.push(mongoose.Types.ObjectId(prod.product_id));
            })

            const products = await Product.find({
                _id: {
                    $in: products_arr_ids
                },
                is_deleted: false
            });

            return res.status(200).json({
                cart_id: req.params.cart_id,
                products: products
            });
        } else {
            return res.status(200).json({});
        }
    } catch (e) {
        console.log(e);

        return res.status(400).json({
            msg: 'Something went wrong'
        });
    }
});

router.post('/delete/:cart_id', async (req, res) => {
    try {
        const cart = await Cart.findOne({
            cart_id: req.params.cart_id
        });

        if (cart) {
            const cartProducts = [];

            cart.products.forEach(product => {
                if (product.product_id.toString() !== req.body.product_id || ( product.product_id.toString() === req.body.product_id && product.size !== req.body.size)) {
                    cartProducts.push({
                        product_id: mongoose.Types.ObjectId(product.product_id),
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        image_url: product.image_url,
                        size: product.size,
                        quantity: product.quantity
                    });
                }
            });

            if (cartProducts.length) {
                await Cart.findOneAndUpdate({
                    cart_id: req.params.cart_id
                }, {
                    products: cartProducts
                }, {
                    new: true
                });
            } else {
                await Cart.deleteOne({
                    cart_id: req.params.cart_id
                });
            }

            return res.json({
                cart_id: req.params.cart_id,
                products: cartProducts
            });
        } else {
            return res.json({
                msg: 'Something went wrong'
            });
        }
    } catch (error) {
        console.log(e);

        return res.status(400).json({
            msg: 'Something went wrong'
        });
    }
});

router.put('/update/:cart_id', async(req, res) => {
    try {
        const cart = await Cart.findOne({
            cart_id: req.params.cart_id
        });

        if (cart) {
            let cartProducts = []

            req.body.products.forEach(product => {
                cartProducts.push({
                    product_id: mongoose.Types.ObjectId(product.product_id),
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image_url: product.image_url,
                    size: product.size,
                    quantity: product.quantity
                })
            })

            const cart =  await Cart.findOneAndUpdate({
                cart_id: req.params.cart_id
            }, {
                products: cartProducts
            }, {
                new: true
            });

            return res.status(200).json({
                cart_id: req.params.cart_id,
                products: cart.products
            });
        } else {
            return res.json({
                msg: 'Something went wrong'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
})

module.exports = router;