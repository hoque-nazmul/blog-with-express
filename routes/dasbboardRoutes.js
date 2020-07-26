const router = require('express').Router();
const { isAuthenticated } = require('./../middleware/isAuthenticated')
const {
    dashboardGetController
} = require('./../controllers/dashboardControllers');

router.get('/', isAuthenticated, dashboardGetController);

module.exports = router;