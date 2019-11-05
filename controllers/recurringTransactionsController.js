const recurringTransactions = require("../models/recurringTransactions");

exports.listAllRecurringTransactions = (req, res) => {
  console.log(">>>>>>>>>>>>>> IN listAllRecurringTransactions <<<<<<<<<");
  recurringTransactions.find({}, (err, recurringtransactions) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(recurringtransactions);
    console.log(recurringtransactions);
  });
};

exports.readRecurringTransaction = (req, res) => {
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params._id;       
  var o_id = new ObjectId(id);
 
  recurringTransactions.find(o_id, (err, recurringtransactions) => {
    console.log("the o_id is ", o_id);

    if (err) {
      res.status(500).send(err);
    }
    console.log("Response is", res);

    res.status(200).json(recurringtransactions);
  });

};