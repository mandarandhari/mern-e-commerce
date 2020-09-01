const router = require('express').Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const product_on_banner = await Product.findOne({
            show_on_banner: true
        }, {
            title: 1,
            description: 1,
            size: 1,
            original_price: 1,
            price: 1,
            image_url: 1
        });

        const products = await Product.find({
            show_on_banner: {
                $ne: true
            }
        }, {
            title: 1,
            description: 1,
            size: 1,
            original_price: 1,
            price: 1,
            image_url: 1
        });

        return res.status(200).json({
            product_on_banner: product_on_banner,
            products: products
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
});

module.exports = router;