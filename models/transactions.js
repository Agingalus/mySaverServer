// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    _id: {
        type: String,
        required: false
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now // this line means we don't have to overtly set the time 
            // the task was created, it will be set as we create a new document
    },
    AccountID: {
        type: Number,
        required: true,
    },
    Category: {
        type: Number,
        required: true,
    },
    Payee: {
        type: String,
        required: true,
    },
    Memo: {
        type: String,
        required: false,
    },
    Amount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Tasks", TransactionsSchema);