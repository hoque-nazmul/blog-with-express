const { body } = require('express-validator');

module.exports = [
    body('email')
        .not().isEmpty().withMessage("Email is Required"),
    body('password')
        .not().isEmpty().withMessage("Password is Required")
]