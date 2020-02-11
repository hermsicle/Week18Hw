const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    db.News.create(req.body).then(newArticle => {
        axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
            let $ = cheerio.load(urlResponse.data);
            let newArticle = [];
            $('div.css-1l4spti').each((i, element) => {
                let headline = $(element)
                    .find('h2').text();
                //console.log(header + "\n")
                let text = $(element)
                    .find('p').text();
                //console.log(summary + "\n");
                let url = $(element)
                    .find('a').attr('href')
                //console.log("https://www.nytimes.com" + url + "\n");
                newArticle.push({
                    headline, text, url
                });
            })
            res.json(newArticle)
        })
    })
})

router.get('/all', (req, res) => {
    db.News.find().then(allNews => {
        res.send(allNews)
    })
})

router.post('/new', (req, res) => {
    db.News.create(req.body).then(newArticle => {
        res.json(newArticle)
    }).catch(err => res.send(err))
})

router.post('/comments', (req, res) => {
    db.News.findByIdAndUpdate(
        { _id: req.query.id },
        { $push: { comments: req.query.comments } }
    ).catch(err => res.send(err))
})

router.delete("/delete/:id", (req, res) => {
    db.News.deleteOne({ _id: req.params.id }).then(() => {
        res.send("success");
    });
});

module.exports = router;