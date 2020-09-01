const router = require('express').Router();

const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
    try {
        const product = await Product.findById(req.body.product_id);

        if (product) {
            const cartProduct = new Cart({
                cart_id: req.body.cart_id,
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                size: req.body.size
            });

            await cartProduct.save();

            const cart = await Cart.aggregate(
                [
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
                        }
                    },{
                        $unwind: '$product'
                    }
                ]
            );

            let cartProducts = [];

            cart.forEach(c => {
                cartProducts.push({
                    _id: c._id,
                    product_id: c.product_id,
                    quantity: c.quantity,
                    size: c.size,
                    title: c.product.title,
                    price: c.product.price,
                    image: c.product.image_url
                });
            })

            return res.status(200).json({
                cart_id: req.body.cart_id,
                products: cartProducts
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
        const cart = await Cart.aggregate(
            [
                {
                    $match: {
                        cart_id: req.params.cart_id
                    }
                }, {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                },{
                    $unwind: '$product'
                }
            ]
        );

        if (cart) {
            let cartProducts = [];

            cart.forEach(c => {
                cartProducts.push({
                    _id: c._id,
                    product_id: c.product_id,
                    quantity: c.quantity,
                    size: c.size,
                    title: c.product.title,
                    price: c.product.price,
                    image: c.product.image_url
                });
            })

            return res.status(200).json({
                cart_id: req.params.cart_id,
                products: cartProducts
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

router.delete('/:product_id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.product_id);

        return res.status(200).json({
            status: true
        })
    } catch (error) {
        console.log(e);

        return res.status(400).json({
            msg: 'Something went wrong'
        });
    }
});

router.put('/:product__id', async(req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.product__id, {
            quantity: req.body.quantity
        });

        return res.status(200).json({
            status: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
})

module.exports = router;