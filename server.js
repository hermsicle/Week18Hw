const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const logger = require('morgan');
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/week18HWv2";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true //Extracted this line from running our dev . It will say pass option {   useUnifiedTopology: true  }
});
mongoose.set('useCreateIndex', true);


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./views'));

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const htmlRoutes = require('./routes/clientRoutes');
app.use('/', htmlRoutes);

connection.once("open", () => {
    console.log('connected to mongoDb'.cyan); //Cyan is colors
    console.log('-------------------------------'.rainbow) //Rainbow is cyan
})

app.listen(PORT, () => {
    console.log('------------------------------------'.rainbow)
    console.log(`Listening to http://localhost:${PORT}`)
})