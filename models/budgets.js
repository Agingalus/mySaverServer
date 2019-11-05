const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetsSchema = new Schema({
  _id: {
    type: String,
    required: false
  },
  BudgetID: {
    type: Number,
    required: true,
  },
  GoalCategory: {
    type: Number,
    required: true,
  },
  GoalAmount: {
    type: Number,
    required: true,
  },
  Description: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Budgets", BudgetsSchema);