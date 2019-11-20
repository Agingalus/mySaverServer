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
  Accounts.findOneAndUpdate(
    { _id: req.params._id },  
    req.body,
    { new: true },  
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
  var ObjectId = require('mongodb').ObjectID;
  var id = req.params._id;
  var o_id = new ObjectId(id);

  Account.find(o_id, (err, accounts) => {
    console.log("the o_id is ", o_id);

    if (err) {
      res.status(500).send(err);
    }
    console.log(accounts);
  });


    Account.deleteOne({ "_id": o_id }, (err, accounts) => {
      console.log("inside DeleteOne the id is ", o_id);

      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: "Account successfully deleted." });
    });

    Account.find(o_id, (err, accounts) => {
      console.log("the o_id is ", o_id);
  
      if (err) {
        res.status(500).send(err);
      }
     
      console.log("Second find result");
      console.log(accounts);

});
}


