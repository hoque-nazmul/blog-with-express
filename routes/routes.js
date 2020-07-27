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
    }, 
    {
        path: '*', 
        handler: (req, res) => {
            res.render('pages/404')
        }
    }
]

// Export All Routes
module.exports = (app) => {
    routes.forEach(route => {
        if (route.path === '/' || route.path === '*'){
            app.get(route.path, route.handler)
        } else {
            app.use(route.path, route.handler)
        }
    })
}