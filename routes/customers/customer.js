const router = require('express').Router();

const Customer = require('../../models/Customer');
const auth = require('../../middlewares/auth');

router.get('/', auth, async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer._id);

        return res.status(200).json({
            id: customer._id,
            firstName: customer.first_name,
            lastName: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            created_at: customer.created_at
        });
    } catch (error) {
        return res.status(400).json({
            'msg': 'Something went wrong'
        })
    }
});

module.exports = router;