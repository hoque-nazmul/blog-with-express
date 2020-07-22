const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// required info
const PORT = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.tamdy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


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

