const Accounts = require("../models/accounts");

exports.listAllAccounts = (req, res) => {
  console.log(">>>>>>>>>>>>>> IN listAllAccounts <<<<<<<<<");
  Accounts.find({}, (err, accounts) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(accounts);
    console.log(accounts);
  });
};

exports.readAccounts= (req, res) => {
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params._id;       
  var o_id = new ObjectId(id);
 
  Accounts.find(o_id, (err, accounts) => {
    console.log("the o_id is ", o_id);

    if (err) {
      res.status(500).send(err);
    }
    console.log("Response is", res);

    res.status(200).json(accounts);
  });

};