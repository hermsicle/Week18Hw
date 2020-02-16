const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;