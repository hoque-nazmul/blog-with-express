const User = require("../models/User")

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.user) {
            return next()
        }

        try {
            const user = await User.findById(req.session.user._id);
            req.user = user;
            next()
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}