const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dasbboardRoutes');

const routes = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: "Hello World"
            })
        }
    }
]

module.exports = (app) => {
    routes.forEach(route => {
        app.use(route.path, route.handler)
    })
}