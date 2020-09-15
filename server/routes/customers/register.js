const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const Customer = require('../../models/Customer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: false,
    auth: {
        user: 'adf0269fdd2748',
        pass: '3e2b9de1f54f99'
    }
});

router.post(
    '/',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide valid email').custom(async (email, {req}) => {
            const checkCustomer = await Customer.findOne({email: email});

            if (checkCustomer) {
                throw new Error('Customer already exists');
            }
        }),
        body('phone').notEmpty().withMessage('Phone number is required'),
        body('password').notEmpty().withMessage('Password is required').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
        body('confirmPassword').notEmpty().withMessage('Confirm password is required').custom((confirmPassword, {req}) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Passwords not matching');
            } else {
                return true;
            }
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array({ onlyFirstError: true })
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            const customer = new Customer({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: password
            });

            try {
                await customer.save();

                ejs.renderFile(path.join(path.resolve(), '/emails/register.ejs'), {
                    name: req.body.firstName + ' ' + req.body.lastName,
                    frontend_url: process.env.FRONTEND_URL
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var mainOptions = {
                            from: '"T Shirt Store" shop@tshirtstore.com',
                            to: req.body.email,
                            subject: 'Registered Successfully!!!',
                            html: data
                        };

                        transporter.sendMail(mainOptions, function (err, info) {
                            if (err) {
                              console.log(err);
                            }
                        });
                    }
                });

                ejs.renderFile(path.join(path.resolve(), '/emails/register_admin.ejs'), {
                    name: req.body.firstName + ' ' + req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    frontend_url: process.env.FRONTEND_URL
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var mainOptions = {
                            from: '"T Shirt Store" shop@tshirtstore.com',
                            to: 'admin@tshirtstore.com',
                            subject: 'New registration',
                            html: data
                        }
                    }

                    transporter.sendMail(mainOptions, (err, info) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });

                const token = await jwt.sign({
                    customer: {
                        _id: customer._id
                    }
                }, process.env.SECRET);

                return res.status(200).json({
                    token: token,
                    customer: {
                        id: customer._id,
                        firstName: customer.first_name,
                        lastName: customer.last_name,
                        email: customer.email,
                        phone: customer.phone,
                        created_at: customer.created_at
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    msg: 'Something went wrong'
                });
            }
        }
    }
);

module.exports = router;