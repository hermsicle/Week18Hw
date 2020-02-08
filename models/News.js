const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String,
        trim: true,
        required: "Must pass a string value for headline"
    },

    text: {
        type: String,
        required: "Must pass a string value for headline"
    },

    comments: {
        type: [Schema.Types.String],
        default: [],
        required: "Must pass a string value for headline"
    },

    url: {
        type: String,
        required: "Must pass a string value for headline"
    }
})

const News = mongoose.model("News", NewsSchema);

module.exports = News;