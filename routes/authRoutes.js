const authRoutes = require('express').Router();
const signupValidator = require('./../validator/signupValidator');
const loginValidator = require('./../validator/loginValidator');
const { 
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
 } = require('./../controllers/authControllers');



authRoutes.get('/signup', signupGetController);
authRoutes.post('/signup',signupValidator, signupPostController);
authRoutes.get('/login', loginGetController);
authRoutes.post('/login',loginValidator, loginPostController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;

