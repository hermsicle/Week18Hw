const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String,
        trim: true,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    comments: {
        type: [Schema.Types.String],
        default: [],
        required: false
    },

    url: {
        type: String,
        required: false
    }
})

const News = mongoose.model("News", NewsSchema);

module.exports = News;