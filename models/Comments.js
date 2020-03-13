const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    content: String,
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articles"
    }
})

const Comments = mongoose.model("Comments", commentsSchema)

module.exports = Comments;