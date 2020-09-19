const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const Customer = require(path.join(__dirname, './../../models/Customer'));

router.post(
    '/',
    [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide valid email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array({ onlyFirstError: true })
            });
        } else {
            const customer = await Customer.findOne({
                email: req.body.email
            });

            if (!customer) {
                return res.status(400).json({
                    status: false,
                    errors: [
                        {
                            param: 'invalid',
                            msg: 'Invalid credentials'
                        }
                    ]
                });
            }

            try {
                const match = await bcrypt.compare(req.body.password, customer.password);

                if (!match) {
                    return res.status(400).json({
                        status: false,
                        errors: [
                            {
                                param: 'invalid',
                                msg: 'Invalid credentials'
                            }
                        ]
                    });
                }

                jwt.sign({
                    customer: {
                        _id: customer._id
                    }
                }, process.env.SECRET, {
                    expiresIn: 3600
                }, (e, token) => {
                    if (e) throw e;

                    res.status(200).json({
                        token: token,
                        customer: {
                            id: customer._id,
                            firstName: customer.first_name,
                            lastName: customer.last_name,
                            email: customer.email,
                            phone: customer.phone,
                            created_at: customer.created_at
                        }
                    })
                })
            } catch(error) {
                console.log(error.message);

                return res.status(500).json({
                    status: false,
                    msg: 'Something went wrong'
                });
            }
        }
});

module.exports = router;