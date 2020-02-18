const express = require('express');
const router = express.Router();
//const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');
const ArticlesDb = require('../models/Articles');

//Create a request to redirect to articles
// router.get('/', (req, res) => {
//     res.redirect('/articles');
// });

//Create route to scrape articles:
router.get('/scrape', (req, res) => {
    axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);
        let newCount = 0
        let articlesArray = [];
        $('div.css-1l4spti').each((i, element) => {
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
            //console.log(results);
            articlesArray.push(results.headline, results.summary, results.url);
            //console.log(articlesArray)
            // ArticlesDb.create(
            //     [{ headline: results.headline },
            //     { summary: results.summary },
            //     { url: results.url }]
            // ).then(newArticles => {
            //     res.send(newArticles)
            // }).catch(err =>
            //     res.send(err))
        })
        res.json({ browserDidntSpin: true, newCount: newCount })
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
    db.News.find({ _id: req.params.id }).then(foundNews => {
        res.send(foundNews);
    });
});

router.post("/new", (req, res) => {
    db.News.create({
        headline: req.body.headline,
        summary: req.body.summary,
        url: req.body.url
    }).then(newArticle => {
        res.send(newArticle);
    }).catch(err => res.send(err))
});

router.delete("/delete/:id", (req, res) => {
    ArticlesDb.deleteOne({ _id: req.params.id }).then(() => {
        res.send("success");
    });
});

router.delete("/delete", (req, res) => {
    ArticlesDb.deleteMany({}).then(() => {
        res.send('success')
    })
})




module.exports = router;
