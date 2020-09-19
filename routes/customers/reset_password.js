const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const nodemailer  = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');

const Customer = require('../../models/Customer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    }
});

router.post(
    '/', [
        body('email').notEmpty().withMessage('Email should not be empty')
        .isEmail().withMessage('Please provide valid email')
        .custom(async (email, { req }) => {
            const customer = await Customer.findOne({
                email: req.body.email
            });

            if (customer) {
                return true;
            } else {
                throw new Error('Customer does not exists');
            }
        })
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                status: false,
                errors: errors.array({
                    onlyFirstError: true
                })
            });
        } else {
            try {
                let password_reset_token = '';

                const charString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

                for (var i = 32; i > 0; --i) {
                    password_reset_token += charString[Math.floor(Math.random() * charString.length)]
                };

                await Customer.findOneAndUpdate({
                    email: req.body.email
                }, {
                    password_reset_token: password_reset_token,
                    is_token_used: false
                });

                ejs.renderFile(path.join(path.resolve(), '/emails/reset_password.ejs'), {
                    frontend_url: process.env.FRONTEND_URL,
                    token: password_reset_token
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const mainOptions  = {
                            from: "'T shirt store' shop@tshirtstore.com",
                            to: req.body.email,
                            subject: 'Reset Password',
                            html: data
                        };

                        transporter.sendMail(mainOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            }
                        });
                    }
                });

                return res.json({
                    status: true
                });
            } catch (error) {
                console.log(error);

                return res.json({
                    status: false,
                    errors: [
                        {
                            msg: 'Something went wrong'
                        }
                    ]
                });
            }
        }
    }
);

router.get('/:token', async (req, res) => {
    if (req.params.token) {
        const customer = await Customer.findOne({
            password_reset_token: req.params.token,
            is_token_used: false
        });

        if (customer) {
            await Customer.findByIdAndUpdate(customer._id, {
                is_token_used: true
            });

            return res.json({
                status: true,
                customer_id: customer._id
            })
        } else {
            return res.json({
                status: false
            });
        }
    } else {
        return res.json({
            status: false
        });
    }
});

router.put(
    '/', [
        body('password').notEmpty().withMessage('Password should not be empty')
        .isLength({min: 6}).withMessage('Password should be at least 6 characters'),
        body('confirmPassword').notEmpty().withMessage('Confirm password should not be empty')
        .isLength({min: 6}).withMessage('Confirm password must be at least 6 characters long')
        .custom(async (confirmPassword, { req }) => {
            if (confirmPassword === req.body.password) {
                return true;
            } else {
                throw new Error('Passwords not matching');
            }
        })
    ],
    async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

            await Customer.findByIdAndUpdate(req.body.id, {
                password: password,
                password_reset_token: null,
                is_token_used: false,
                updated_at: Date.now()
            });

            return res.json({
                status: true
            });
        } catch (error) {
            return res.json({
                status: false,
                msg: 'Something went wrong'
            });
        }
    }
);

module.exports = router;