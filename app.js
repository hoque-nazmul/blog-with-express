const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// View Enngine Setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "blog_express",
        resave: false,
        saveUninitialized: false, 
        cookie: {
            maxAge: 7200000
        }
    })
]
app.use(middlewares)

// required info
const PORT = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.tamdy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    });
});


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => console.log("Server is Running at Port " + PORT));
    })
    .catch(err => {
        console.log(err);
    }) 

