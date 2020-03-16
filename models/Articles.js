const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: !true,
    },
    summary: {
        type: String,
        required: true,
        unique: !true,
    },
    url: {
        type: String,
        required: true,
        unique: !true,
    },
    comment: [{
        type: String
    }],
    saved: {
        type: Boolean
    }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;