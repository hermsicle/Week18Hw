const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get("/all", (req, res) => {
    db.News.find().then(allNews => {
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

router.patch("/update", (req, res) => {
    db.News.findOneAndUpdate({ _id: req.body.id }, { headline: req.body.headline }).then(
        updatedNews => {
            res.send({ message: "success", News: updatedNews });
        }
    );
});

router.delete("/delete/:id", (req, res) => {
    db.News.deleteOne({ _id: req.params.id }).then(() => {
        res.send("success");
    });
});


router.get('/test', (req, res) => {
    axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
        let $ = cheerio.load(urlResponse.data);

        $('div.css-1l4spti').each((i, element) => {
            let headline = $(element).find('h2').text();
            let summary = $(element).find('p').text();
            let url = $(element).find('a').attr('href')

            db.News.create({
                headline: headline,
                summary: summary,
                url: url
            })
        }).catch(err => console.log(err))
    })
})


module.exports = router;

// newsList = [];
// router.get("/", (req, res) => {
//     axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
//         let $ = cheerio.load(urlResponse.data);
//         let blocks = $('div.css-1l4spti');
//         let header = $(element).find('h2').text();
//         let summary = $(element).find('p').text();
//         let url = $(element).find('a').attr('href');
//         for (let i = 0; i < blocks.length; i++) {
//             let temp = new News({
//                 headline: header[i].children[0].data,
//                 summary: summary[i].children[0].data,
//                 url: url[i].children[0].data
//             });
//             newsList.push(temp);
//         }
//     })
// })