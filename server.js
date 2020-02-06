const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const colors = require('colors');
const PORT = 5000 || process.env.PORT;

//Very important to connect our mongoDB, otherwwise posgtman would not work.
mongoose.connect("mongodb://localhost/week18HW", {
    useNewUrlParser: true,
    useUnifiedTopology: true //Extracted this line from running our dev . It will say pass option {   useUnifiedTopology: true  }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

connection.once("open", () => {
    console.log('connected to mongoDb'.cyan); //Cyan is colors
    console.log('-------------------------------'.rainbow) //Rainbow is cyan
})

app.listen(PORT, () => {
    console.log('------------------------------------'.rainbow)
    console.log(`Listening to http://localhost:${PORT}`)
})