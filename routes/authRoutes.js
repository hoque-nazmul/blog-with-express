const authRoutes = require('express').Router();
const { 
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
 } = require('./../controllers/authControllers')

authRoutes.get('/signup', signupGetController);
authRoutes.post('/signup', signupPostController);
authRoutes.get('/login', loginGetController);
authRoutes.post('/login', loginPostController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;

