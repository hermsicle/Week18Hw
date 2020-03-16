const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    // userComments: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Articles"
    // },
    // comments: {
    //     type: String
    // }
})

const Comments = mongoose.model("Comments", commentsSchema)

module.exports = Comments;