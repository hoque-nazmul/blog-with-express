const router = require('express').Router();
const {
    dashboardGetController
} = require('./../controllers/dashboardControllers');

router.get('/', dashboardGetController);

module.exports = router;