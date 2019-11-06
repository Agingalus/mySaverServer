const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categoriesSchema = new Schema({
    _id: {
        type: String,
        required: false
    },
    categoryid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("categories", categoriesSchema);