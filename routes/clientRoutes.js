const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ("../views/home.html")));
    axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);
        $('div.css-1l4spti').each((i, element) => {
            let header = $(element)
                .find('h2').text();
            console.log(header + "\n")
            let summary = $(element)
                .find('p').text();
            console.log(summary + "\n");
            let url = $(element)
                .find('a').attr('href')
            console.log("https://www.nytimes.com" + url + "\n")
        })
    })
})

router.get('/saved', (req, res) => {
    res.sendFile(path.join(__dirname, ("../views/saved.html")))
})




module.exports = router;