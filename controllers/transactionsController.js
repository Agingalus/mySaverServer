const Transaction = require("../models/transactions");

// var connection = mongoose.connection;

// let db = database.db("mySaverDB");
// go to mongo and select network and allow any url to come in
// go to azure and turn on app logging so can see console.log messages
exports.listAllTransactions = (req, res) => {
    console.log(">>>>>>>>>>>>>> IN listAllTransactions <<<<<<<<<");
    // connection.db.collection("Transactions", function(err, collection) {
    //     collection.find({}).toArray(function(err, data) {
    //         console.log(data); // it will print your collection data
    //         // console.log("all good")
    //     })
    // });

    Transaction.find({}, (err, transaction) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        //?transaction = { Payee: "me", Amount: 100 }
        // res.send(transaction);
        res.status(200).json(transaction);
        console.log(transaction);
        console.log(" not all good")
    });
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    // try {
    //     var doc = db.collection('Transactions').find().toArray();
    //     console.log(doc);

    //     res.send(doc);
    // } catch (err) {
    //     console.log('get all failed');
    //     console.error(err);
    // }
};

exports.createNewTransaction = (req, res) => {
    let newTransaction = new Transaction(req.body);
    console.log(newTransaction);
    newTransaction.save((err, transaction) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(transaction);
    });
};

exports.readTransaction = (req, body) => {
    Transaction.findById(req.params.transactionid, (err, transaction) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(transaction);
    });
};

exports.updateTransaction = (req, res) => {
    console.log('Transaction id at server is ' + req.params.transactionid);
    Transaction.findOneAndUpdate({ _id: req.params.transactionid }, // don't know who changed the name from _id
        req.body, { new: true }, // true or false to let it add if not present?
        (err, transaction) => {
            if (err) {
                res.status(500).send(err);
            }
            console.log(transaction);
            res.status(200).json(transaction);
        }
    );
};



exports.deleteTransaction = (req, res) => {
    Transaction.remove({ _id: req.params.taskid }, (err, task) => { // don't know who changed the name from _id
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({ message: "Transaction successfully deleted" });
    });
};