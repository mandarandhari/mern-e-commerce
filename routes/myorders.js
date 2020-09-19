const router = require('express').Router();
const path = require('path');

const auth = require(path.join(__dirname, '../middlewares/auth'));
const Customer = require(path.join(__dirname, '../models/Customer'));
const Order = require(path.join(__dirname, '../models/Order'));

router.get('/:customer_id', auth, async (req, res) => {
    if (req.params.customer_id) {
        const customer = await Customer.findById(req.params.customer_id);

        if (customer) {
            const orders = await Order.find({
                customer_id: req.params.customer_id,
                payment_status: 'succeeded'
            }, {
                order_id: 1,
                order_status: 1,
                products: 1,
                created_at: 1,
                updated_at: 1
            }).sort({
                _id: -1
            });

            return res.status(200).json(orders);
        } else {
            return res.status(500).json({
                msg: 'Customer does not exists'
            });
        }
    } else {
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
});

module.exports = router;