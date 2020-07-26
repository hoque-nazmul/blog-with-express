const authRoutes = require('express').Router();
const signupValidator = require('./../validator/signupValidator');
const loginValidator = require('./../validator/loginValidator');
const { isUnAuthenticated } = require('./../middleware/isAuthenticated');
const { 
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
 } = require('./../controllers/authControllers');



authRoutes.get('/signup', isUnAuthenticated, signupGetController);
authRoutes.post('/signup', isUnAuthenticated, signupValidator, signupPostController);
authRoutes.get('/login', isUnAuthenticated,  loginGetController);
authRoutes.post('/login', isUnAuthenticated, loginValidator, loginPostController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;

