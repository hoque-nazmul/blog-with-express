module.exports = () => {
    return (req, res, next)  => {
        res.locals.user = req.user;
        res.locals.isLogin = req.session.isLogin;
        next();
    }
}