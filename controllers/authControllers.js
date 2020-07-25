const bcrypt = require('bcrypt');
const User = require("../models/User");
const errorFormatter = require('./../utilities/validationErrorFormatter');
const { validationResult } = require('express-validator');

exports.signupGetController = (req, res, next) => {
    res.render('pages/signup', { title: "Create a new Account", error: {}, value: {} });
}

exports.signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        return res.render('pages/signup', { title: "Create a new Account", error: errors.mapped(), value: {username, email, password} });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 11)
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const createdUser = await user.save()
        console.log("user created successfully");
        res.render('pages/signup', { title: "Create a new Account" });
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/login', { title: "Login to your Account" })
}

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                message: "Invalid email or password"
            })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.json({
                message: "Invalid email or password"
            })
        } else {
            console.log("user login successfully", user);
            res.render('pages/login', { title: "Login to your Account" });
        }

    } catch (err) {
        console.log(err);
        next(err);
    }

}

exports.logoutController = (req, res, next) => {

}