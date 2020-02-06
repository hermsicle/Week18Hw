const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({ extended: true });
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})