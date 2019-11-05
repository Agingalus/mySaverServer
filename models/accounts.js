const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountsSchema = new Schema({
  _id: {
    type: String,
    required: false
  },
  bank: {
    type: String,
    required: true,
  },
  bankaccountnumber: {
    type: Number,
    required: true,
  },
  accounttype: {
    type: Number,
    required: true,
  },
  accountid: {
    type: Number,
    required: true,
  },
  availablebalance: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: false,
  },
  friendlyname: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Accounts", AccountsSchema);