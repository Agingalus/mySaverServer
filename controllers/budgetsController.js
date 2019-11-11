const Budgets = require("../models/budgets");

exports.listAllBudgets = (req, res) => {
    console.log(">>>>>>>>>>>>>> IN listAllBudget <<<<<<<<<");
    Budgets.find({}, (err, budgets) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).json(budgets);
        console.log(budgets);
    });
};

exports.readBudgets = (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params._id;
    var o_id = new ObjectId(id);

    Budgets.find(o_id, (err, budgets) => {
        console.log("the o_id is ", o_id);

        if (err) {
            res.status(500).send(err);
        }
        console.log("Response is", res);

        res.status(200).json(budgets);
    });

};
exports.createNewBudget = (req, res) => {
    let newBudget = new Budgets(req.body);
    console.log(newBudget);
    newBudget.save((err, budget) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(budget);
    });
};