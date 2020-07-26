const Flash = require('./../utilities/Flash')

exports.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard',
        {
            title: "Welcome to Dashboard",
            flashMessage: Flash.getFlashMsg(req)
        })
}