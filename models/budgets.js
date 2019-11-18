const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetsSchema = new Schema({
    // _id: {
    //     type: String,
    //     required: false
    // },
    _id: { type: mongoose.Types.ObjectId, auto: true },
    BudgetID: {
        type: Number,
        required: false,
    },
    Name: {
        type: String,
        required: true
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
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Budgets", BudgetsSchema);