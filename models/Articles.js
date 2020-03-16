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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    saved: {
        type: Boolean,
        default: false
    }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;