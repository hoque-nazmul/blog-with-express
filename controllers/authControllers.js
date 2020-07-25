const bcrypt = require('bcrypt');
const User = require("../models/User");

exports.signupGetController = (req, res, next) => {
    res.render('pages/signup', { title: "Create a new Account" });
}

exports.signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body;

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

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}