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

// Export All Routes
module.exports = (app) => {
    routes.forEach(route => {
        if (route.path === '/'){
            app.get(route.path, route.handler)
        } else {
            app.use(route.path, route.handler)
        }
    })
}