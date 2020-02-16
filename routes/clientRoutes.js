const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ("../views/home.html")));
})

router.get('/saved', (req, res) => {
    res.sendFile(path.join(__dirname, ("../views/saved.html")))
})




module.exports = router;