const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const Contact = require('./../models/Contact');

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
    '/add',
    [
        body('name').notEmpty().withMessage('Name should not be empty'),
        body('email').notEmpty().withMessage('Email should not be empty').isEmail().withMessage('Please provide valid email'),
        body('message').notEmpty().withMessage('Message should not be empty')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                errors: errors.array({ onlyFirstError: true })
            });
        } else {
            try {
                await Contact.create({
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message
                });

                ejs.renderFile(path.join(path.resolve(), '/emails/contact.ejs'), {
                    frontend_url: process.env.FRONTEND_URL
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const mainOptions = {
                            from: "'T shirt store' store@tshirtstore.com",
                            to: req.body.email,
                            subject: 'We got your message',
                            html: data
                        };

                        transporter.sendMail(mainOptions, (err, info) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });

                ejs.renderFile(path.join(path.resolve(), '/emails/contact_admin.ejs'), {
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message,
                    frontend_url: process.env.FRONTEND_URL
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const mainOptions = {
                            from: req.body.email,
                            to: 'admin@tshirtstore.com',
                            subject: 'Contact us',
                            html: data
                        };

                        transporter.sendMail(mainOptions, (err, info) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });

                return res.json({
                    success: true
                });
            } catch (error) {
                return res.json({
                    msg: 'Something went wrong'
                });
            }
        }
    }
);

module.exports = router;