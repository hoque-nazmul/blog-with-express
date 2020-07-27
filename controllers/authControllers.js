const bcrypt = require('bcrypt');
const User = require("../models/User");
const errorFormatter = require('./../utilities/validationErrorFormatter');
const { validationResult } = require('express-validator');
const validationErrorFormatter = require('./../utilities/validationErrorFormatter');
const session = require('express-session');
const Flash = require('./../utilities/Flash');

exports.signupGetController = (req, res, next) => {
    res.render('pages/signup',
        {
            title: "Create a new Account",
            error: {},
            value: {},
            flashMessage: Flash.getFlashMsg(req)
        });
}

exports.signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        return res.render('pages/signup',
            {
                title: "Create a new Account", 
                error: errors.mapped(), 
                value: { username, email, password },
                flashMessage: Flash.getFlashMsg(req)
            });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 11)
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save()
        req.flash('success', 'Created your account successfully!')
        res.redirect('/auth/login')
    } catch (err) {
        next(err)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/login',
        {
            title: "Login to your Account",
            error: {},
            flashMessage: Flash.getFlashMsg(req)
        })
}

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req).formatWith(validationErrorFormatter);

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please, Provide your recorded information')
        return res.render('pages/login',
            {
                title: "Login to your Account",
                error: errors.mapped(),
                flashMessage: Flash.getFlashMsg(req)
            })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', 'Invalid Credentials')
            return res.render('pages/login',
                {
                    title: "Login to your Account",
                    error: {},
                    flashMessage: Flash.getFlashMsg(req)
                })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'Invalid Credentials')
            return res.render('pages/login',
                {
                    title: "Login to your Account",
                    error: {},
                    flashMessage: Flash.getFlashMsg(req)
                })
        } else {
            req.session.isLogin = true;
            req.session.user = user;
            req.session.save(err => {
                if (err) {
                    return next(err);
                }
                req.flash('success', 'Successfully Logged in')
                return res.redirect('/dashboard')
            })
        }

    } catch (err) {
        next(err);
    }

}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        }
        
        return res.redirect('/auth/login');
    })
}