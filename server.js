const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const colors = require('colors');
const PORT = 5000 || process.env.PORT;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.once("open", () => {
    console.log('connected to mongoDb'.cyan); //Cyan is colors
    console.log('-------------------------------'.rainbow) //Rainbow is cyan
})

app.listen(PORT, () => {
    console.log('------------------------------------'.rainbow)
    console.log(`Listening to http://localhost:${PORT}`)
})