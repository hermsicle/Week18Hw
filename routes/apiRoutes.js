const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const ArticlesDb = require('../models/Articles');
const db = require('../models')

//Create route to scrape articles:
router.get('/scrape', (req, res) => {
    axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);
        let newCount = 0
        let articlesArray = [];
        $('li.css-ye6x8s').each((i, element) => {
            newCount++
            let results = {
                headline: "",
                summary: "",
                url: ""
            };
            results.headline = $(element).find('h2').text();
            results.summary = $(element).find('p').text();
            results.url = $(element).find('a').attr('href');
            ArticlesDb.create(results).then(x => console.log(x))
                .catch(err => { console.log(err) })
            articlesArray.push(results.headline, results.summary, results.url);
        });
        //console.log(articlesArray)
        res.json({ browserDidntSpin: true, newCount: newCount })
        //res.redirect("/new")
    }).catch(err => console.log(err))
})

//Create get request to see all scraped articles
router.get("/all", (req, res) => {
    ArticlesDb.find().then(allNews => {
        res.send(allNews);
    }).catch(err => {
        res.send(err)
    })
});

router.get("/find/:id", (req, res) => {
    ArticlesDb.findOne({
        _id: req.params.id
    }).then(searchedArticle => {
        res.send(searchedArticle)
    }).catch(
        err => res.send(err)
    )
})

router.get("/article/:id", (req, res) => {
    ArticlesDb.findOne({ _id: req.params.id })
        .populate('Comments').exec((err, Comments) => {
            console.log("Populated Articles " + Comments)
        }).catch(err => {
            res.send(err)
        })
})

router.post("/new", (req, res) => {
    ArticlesDb.create({
        headline: req.query.headline,
        summary: req.query.summary,
        url: req.query.url
    }).then(newArticle => {
        res.send(newArticle);
    }).catch(err => res.send(err))
});

router.delete("/delete/:id", (req, res) => {
    ArticlesDb.deleteOne({ _id: req.params.id }).then(() => {
        res.send("success");
    }).catch(err => { console.log(err) })
});

router.delete("/delete", (req, res) => {
    ArticlesDb.deleteMany({}).then(() => {
        res.send('success')
    })
})


module.exports = router;
