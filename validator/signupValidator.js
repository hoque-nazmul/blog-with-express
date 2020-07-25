const User = require('./../models/User');
const { body } = require('express-validator');
module.exports =  [
    body('username')
        .isLength({ min: 2, max: 15 }).withMessage('Username must be 2 to 15 characters')
        .custom(async username => {
            const user = await User.findOne({username})
            if (user) {
                return Promise.reject("Username already used")
            }
        })
        .trim(),
    body('email')
        .isEmail().withMessage("Please, Provide an valid email")
        .custom(async email => {
            const user = await User.findOne({email})
            if (user) {
                return Promise.reject("Email already used");
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be six characters'),
    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error("Password doesn't match")
            }
            return true
        })
 ]