const Accounts = require("../models/accounts");

//Get Accounts
exports.listAllAccounts = (req, res) => {
    console.log("Get all accounts");
    Accounts.find({}, (err, accounts) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).json(accounts);
        console.log(accounts);
    });
};

//Create New Account
exports.createNewAccount = (req, res) => {
    let newAccount = new Accounts(req.body);
    console.log(newAccount);
    newAccount.save((err, accounts) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(accounts);
    });
};

//Edit Account
exports.editAccounts = (req, res) => {
    Accounts.findOneAndUpdate({ _id: req.params._id },
        req.body, { new: true },
        (err, accounts) => {
            if (err) {
                res.status(500).send(err);
            }
            console.log(accounts);
            res.status(200).json(accounts);
        }
    );
};


//Delete Account
exports.deleteAccount = (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params._id;
    var o_id = new ObjectId(id);
    let Account = new Accounts(req.body);
    Account.deleteOne({ "_id": o_id }, (err, budget) => {
        console.log("inside DeleteOne the id is ", o_id);

        if (err) {
            //res.status(404).send(err);
            res.status(500).send(err);
        }
        res.status(200).json({ message: "Account successfully deleted." });
    });
};