const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import All Routes & Middlewares
const setMiddlewares = require('./middleware/middlewares');
const setRoutes = require('./routes/routes')

// Initializing Express App
const app = express();

// View Enngine Setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Required Info
const PORT = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.tamdy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


// Using Middlewares from middlewares directory
setMiddlewares(app)

// Using Route from Routes directory
setRoutes(app);

// Connecting Database with MongoDB via Mongoose
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

