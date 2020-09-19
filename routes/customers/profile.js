const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const path = require('path');

const auth = require(path.join(__dirname, '../../middlewares/auth'));
const Customer = require(path.join(__dirname, '../../models/Customer'));

router.post(
    '/',
    auth,
    [
        body('firstName').notEmpty().withMessage('Firstname is required'),
        body('lastName').notEmpty().withMessage('Lastname is required'),
        body('email').notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please provide valid email'),
        body('phone').notEmpty().withMessage('Phone number is required'),
        body('password').custom((password, {req}) => {
            if (password !== '') {
                if (password.length < 6) {
                    throw new Error('Password must be minimum 6 characters long');
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }),
        body('confirmPassword').custom((confirmPassword, {req}) => {
            if (req.body.password !== '') {
                if (confirmPassword === '') {
                    throw new Error('Confirm password is required');
                } else if (req.body.password !== confirmPassword) {
                    throw new Error('Passwords not matching');
                } else {
                    return true;
                }
            } else {
                if (confirmPassword !== '') {
                    throw new Error('Password is required');
                } else {
                    return true;
                }
            }
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array({
                    onlyFirstError: true
                })
            });
        } else {
            const customer = await Customer.findOne({
                email: req.body.email
            });

            if (customer) {
                const customer_data = {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    phone: req.body.phone,
                    updated_at: Date.now()
                };

                if (req.body.password !== '') {
                    const salt = await bcrypt.genSalt(10);
                    customer_data.password = await bcrypt.hash(req.body.password, salt);
                }

                try {
                    const newCustomer = await Customer.findByIdAndUpdate(customer._id, customer_data, {new: true});

                    return res.status(200).json({
                        id: newCustomer._id,
                        firstName: newCustomer.first_name,
                        lastName: newCustomer.last_name,
                        email: newCustomer.email,
                        phone: newCustomer.phone,
                        created_at: newCustomer.created_at
                    });
                } catch (error) {
                    return res.status(500).json({
                        msg: 'Something went wrong'
                    });
                }
            } else {
                return res.status(500).json({
                    msg: 'Something went wrong'
                });
            }
        }
    }
);

module.exports = router;