const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const { bindUserWithRequest } = require('./bindUseriWithRequest');
const setLocals = require('./setLocals');

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.tamdy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// Connect MongoDB Session Store
const store = new MongoDBStore({
    uri: uri,
    collection: 'auth_sessions',
    expires: 1000 * 60 * 60 * 2
});

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
            maxAge: 7200000 // 2hour
        },
        store: store
    }), 
    flash(),
    bindUserWithRequest(),
    setLocals()
]

// Export All Middlewares
module.exports = (app) => {
    middlewares.forEach(middleware => {
        app.use(middleware)
    })
}