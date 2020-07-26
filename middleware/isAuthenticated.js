exports.isAuthenticated = (req, res, next) => {
    if (!req.session.isLogin) {
        return res.redirect('/auth/login');
    }
    next();
}

exports.isUnAuthenticated = (req, res, next) => {
    if (req.session.isLogin) {
        return res.redirect('/dashboard');
    }
    next();
}