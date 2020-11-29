const { join } = require('path');
const { Validator } = require("node-input-validator");
const { Op } = require('sequelize');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { randomBytes } = require('crypto');

require('dotenv').config();

const Customer = require('../../models/Customer');
const { signupRules, signupMessages, loginRules, loginMessages, sendResetPasswordEmailRules, sendResetPasswordEmailMessages, resetPasswordRules, resetPasswordMessages } = require('../../eloquents/customer/authEloquent');
const errorHandler = require('../../helpers/errorHandler');
const sendEmail = require('../../helpers/email');

/**
 * Customer Signup
 * POST /customer/auth/signup
 * Access - Public 
 */
const signup = async (req, res, next) => {
    const { name, email, phone, dob, gender_id, password, confirm_password } = req.body;

    // validate
    const rules = await signupRules();
    const messages = await signupMessages();

    try {
        const v = new Validator(req.body, rules, messages);
        const matched = await v.check();

        if (!matched) {
            throw errorHandler(false, "Invalid Inputs", 422, v.errors);
        }

        const customerExists = await Customer.findOne({
            where: {
                is_active: 1,
                [Op.or]: [
                    { email },
                    { phone }
                ]
            }
        });

        if (customerExists) {
            throw errorHandler(false, "Customer Already Registered", 401);
        }

        const hashedPassword = await hash(password, 12);

        const customer = await Customer.create({
            name,
            email,
            phone,
            gender_id,
            password: hashedPassword
        });

        // generate access token
        const token = sign({ id: customer.id }, process.env.JWT_SECRET);
        customer.access_token = token;

        // generate verification token
        const buffer = randomBytes(32);
        const verificationToken = buffer.toString("hex");
        customer.verification_token = verificationToken;

        await customer.save();

        // send verification email
        const params = {
            from: '"Salon App" <noreply@salonapp.local.in>',
            to: email, // comma separated emails
            subject: "Verification @SalonApp",
            html: `Hello ${name}
                   <p>Please click on the link below to verify your email:</p>
                   <p><a href="${process.env.BASE_URL}">${process.env.BASE_URL}/customer/auth/verify?token=${verificationToken}</a><p>
                   Regards,<br>
                   Salon App Team`,
            cc: [process.env.ADMIN_EMAIL_1, process.env.ADMIN_EMAIL_2],
            replyTo: "noreply@salonapp.local.in",
        };

        sendEmail(params).then(messageId => console.log(messageId)).catch(err => console.log(err));

        res.json({ data: { token }, message: 'Verification email has been sent. Make sure to verify your email address.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

/**
 * Customer Login
 * POST /customer/auth/login
 * Access - Public
 */
const login = async (req, res, next) => {
    const { email, password } = req.body;

    // validate
    const rules = loginRules();
    const messages = loginMessages();

    try {
        const v = new Validator(req.body, rules, messages);
        const matched = await v.check();

        if (!matched) {
            throw errorHandler(false, "Invalid Inputs", 422, v.errors);
        }

        const customer = await Customer.findOne({
            where: {
                is_active: 1,
                email
            }
        });

        if (!customer) {
            throw errorHandler(false, "Invalid Email/Password", 401);
        }

        const passwordMatched = await compare(password, customer.password);

        if (!passwordMatched) {
            throw errorHandler(false, "Invalid Email/Password", 401);
        }

        const token = sign({ id: customer.id }, process.env.JWT_SECRET);

        customer.access_token = token;
        await customer.save();

        res.status(200).json({ message: "Login Successfull", status: true, data: { token } });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

/**
 * Customer Email Verify
 * GET /customer/auth/verify
 * Access - Public 
 */
const emailVerify = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        res.set('Content-Type', 'text/html');
        return res.send(Buffer.from('<h2 style="color: red">Invalid Verification Token</h2>'));
    }

    try {
        const customer = await Customer.findOne({
            where: {
                is_active: 1,
                verification_token: token
            }
        });

        if (!customer) {
            res.set('Content-Type', 'text/html');
            return res.send(Buffer.from('<h2 style="color: red">Invalid Verification Token</h2>'));
        }

        customer.verification_token = null;
        customer.is_verified = 1;
        await customer.save();

        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2 style="color: green">Email Verified Succesfully</h2>'));
    } catch (error) {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2>Oops! Something went wrong</h2>'));
    }
}

/**
 * Customer Send Reset Password Link
 * POST /customer/auth/reset-password
 * Access - Public
 */
const sendResetPasswordLink = async (req, res, next) => {
    const { email } = req.body;

    // validate
    const rules = sendResetPasswordEmailRules();
    const messages = sendResetPasswordEmailMessages();

    try {
        const v = new Validator(req.body, rules, messages);
        const matched = await v.check();

        if (!matched) {
            throw errorHandler(false, "Invalid Inputs", 422, v.errors);
        }

        const customer = await Customer.findOne({
            where: {
                is_active: 1,
                email
            }
        });

        if (!customer) {
            throw errorHandler(false, "Invalid Email/Password", 401);
        }

        if (!customer.is_verified) {
            // generate verification token
            const buffer = randomBytes(32);
            const verificationToken = buffer.toString("hex");
            customer.verification_token = verificationToken;

            await customer.save();

            // send verification email
            const params = {
                from: '"Salon App" <noreply@salonapp.local.in>',
                to: email, // comma separated emails
                subject: "Verification @SalonApp",
                html: `Hello ${customer.name}
                   <p>Please click on the link below to verify your email:</p>
                   <p><a href="${process.env.BASE_URL}">${process.env.BASE_URL}/customer/auth/verify?token=${verificationToken}</a><p>
                   Regards,<br>
                   Salon App Team`,
                cc: [process.env.ADMIN_EMAIL_1, process.env.ADMIN_EMAIL_2],
                replyTo: "noreply@salonapp.local.in",
            };

            sendEmail(params).then(messageId => console.log(messageId)).catch(err => console.log(err));

            throw errorHandler(false, "Email Id not verified. An email verification link has been sent. Please check and verify", 401);
        }

        const buffer = randomBytes(32);
        const resetPasswordToken = buffer.toString('hex');

        customer.reset_password_token = resetPasswordToken;
        customer.reset_password_expires = Date.now() + 3600000; // 1 hour

        await customer.save();

        // send verification email
        const params = {
            from: '"Salon App" <noreply@salonapp.local.in>',
            to: email, // comma separated emails
            subject: "Reset Password Link @SalonApp",
            html: `Hello ${customer.name}
                   <p>Please click on the link below to reset your password:</p>
                   <p><a href="${process.env.BASE_URL}">${process.env.BASE_URL}/customer/auth/reset-password?token=${resetPasswordToken}</a><p>
                   Regards,<br>
                   Salon App Team`,
            cc: [process.env.ADMIN_EMAIL_1, process.env.ADMIN_EMAIL_2],
            replyTo: "noreply@salonapp.local.in",
        };

        sendEmail(params).then(messageId => console.log(messageId)).catch(err => console.log(err));

        res.json({ message: 'Reset password link has been sent on your registered email id.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

/**
 * Customer Reset Password Form
 * GET /customer/auth/reset-password
 * Access - Public 
 */
const resetPassword = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        res.set('Content-Type', 'text/html');
        return res.send(Buffer.from('<h2 style="color: red">Invalid Reset Password Token</h2>'));
    }

    try {
        const customer = await Customer.findOne({
            where: {
                is_active: 1,
                reset_password_token: token
            }
        });

        if (!customer) {
            res.set('Content-Type', 'text/html');
            return res.send(Buffer.from('<h2 style="color: red">Invalid Reset Password Tokn</h2>'));
        }

        if (Date.now() > customer.reset_password_expires) {
            res.set('Content-Type', 'text/html');
            return res.send(Buffer.from('<h2 style="color: red">Reset Password Expired</h2>'));
        }

        res.sendFile(join(__dirname, '../../views/reset-password.html'));
    } catch (error) {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2>Oops! Something went wrong</h2>'));
    }
}

/**
 * Customer Reset Password
 * POST /customer/auth/reset-password
 * Access - Public 
 */
const postResetPassword = async (req, res) => {
    const { password, token } = req.body;

    // validate
    const rules = resetPasswordRules();
    const messages = resetPasswordMessages();

    try {
        const v = new Validator(req.body, rules, messages);
        const matched = await v.check();

        if (!matched) {
            throw errorHandler(false, "Invalid Inputs", 422, v.errors);
        }

        const customer = await Customer.findOne({
            where: {
                is_active: 1,
                reset_password_token: token
            }
        });

        if (!customer) {
            throw errorHandler(false, "Customer Not Registered", 401);
        }

        const hashedPassword = await hash(password, 12);

        customer.reset_password_token = null;
        customer.reset_password_expires = null;
        customer.password = hashedPassword;

        await customer.save();

        res.json({ message: 'Password Reset Successfull. Please login from app.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
}

module.exports = { signup, login, emailVerify, sendResetPasswordLink, resetPassword, postResetPassword }