const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
    res.send('Success')
})

router.post('/', (req, res) => {
    db.News.create(req.body).then(newArticle => {
        res.send(newArticle)
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


module.exports = router;