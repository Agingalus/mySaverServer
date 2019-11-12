const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recurringTransactionsSchema = new Schema({
  /*_id: { //MongoDB gives errors if we include this
    type: String,
    required: false
  },*/
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  AccountName: {
    type: String,
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
  FrequencyDays: {
    type: Number,
    required: true,
  },
  Memo: {
    type: String,
    required: false,
  },
  Amount: {
    type: Number,
    required: true,
  },
  FrequencyMonths: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("recurringTransactions", recurringTransactionsSchema);