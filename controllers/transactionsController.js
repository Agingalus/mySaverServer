const Transaction = require("../models/transactions");


// go to mongo and select network and allow any url to come in
// go to azure and turn on app logging so can see console.log messages
exports.listAllTransactions = (req, res) => {
  console.log(">>>>>>>>>>>>>> IN listAllTransactions <<<<<<<<<");
  Transaction.find({}, (err, transaction) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(transaction);
    console.log(transaction);
  });
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

exports.readTransaction = (req, res) => {
  
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params._id;       
  var o_id = new ObjectId(id);
  //db.test.find({_id:o_id}) //notice the curly braces
  

  Transaction.find(o_id, (err, transaction) => {
    //console.log("the {_id:o_id} is ", {_id:o_id});
    console.log("the o_id is ", o_id);

    if (err) {
      res.status(500).send(err);
    }
    //console.log("Response is", res);

    res.status(200).json(transaction);
  });
};

exports.findTransactionsByValues = (req, res) => {
  
  //var ObjectId = require('mongodb').ObjectId;
  var localvalues = req.params.values;
  console.log ("the values are, ", localvalues)       
  //var o_id = new ObjectId(id);
  //db.test.find({_id:o_id}) //notice the curly braces
 
  var parsedlocalvaluesarray = localvalues.split("&");
  console.log("parsedlocalvaluesarray is ", parsedlocalvaluesarray)

  var myJsonObject = JSON.stringify(parsedlocalvaluesarray);
  console.log("myJsonObject is ", myJsonObject);

  //myJsonObject = {Amount:626.98};

  console.log("myJsonObject is ", myJsonObject);

  Transaction.find(myJsonObject, (err, transaction) => {
    //console.log("the {_id:o_id} is ", {_id:o_id});

    console.log("myJsonObject is ", myJsonObject);

    if (err) {
      res.status(500).send(err);
    }
    //console.log("Response is", res);

    res.status(200).json(transaction);
  });
};


/*
exports.findTransactionsByValues = (req, res) => {
  
//based on https://www.tutorialkart.com/nodejs/split-a-url-into-readable-parts-in-node-js/
// include url module
var url = require('url');

var address = 'http://localhost:8080/index.php?type=page&action=update&id=5221'; 
//var address = req;
console.log("address is ", address);
//console.log("query1 is, ", address.query1)
var q = url.parse(address, true);



 
console.log("q.host ", q.host); //example returns 'localhost:8080'
console.log("q.pathname ", q.pathname); //example returns '/index.php'
console.log("q.search ", q.search); //example returns '?type=page&action=update&id=5221'
 
var qdata = q.query; //example returns an object: { type: page, action: 'update',id='5221' }
console.log("qdata.type ", qdata.type); //example returns 'page'
console.log("qdata.action ", qdata.action); //example returns 'update'
console.log("qdata.id ", qdata.id); //example returns '5221'


// based on https://specify.io/how-tos/find-documents-in-mongodb-using-the-mongo-shell

  Transaction.find(q.query, (err, transaction) => {
    //console.log("the {_id:o_id} is ", {_id:o_id});
    console.log("the q.query is ", q.query);

    if (err) {
      res.status(500).send(err);
    }
    //console.log("Response is", res);

    res.status(200).json(transaction);
  });
};
*/



exports.updateTransaction = (req, res) => {
  console.log('Transaction id at server is ' + req.params.transactionid);
  Transaction.findOneAndUpdate(
    { _id: req.params.transactionid },  // don't know who changed the name from _id
    req.body,
    { new: true },  // true or false to let it add if not present?
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
  Transaction.remove({ _id: req.params.transactionid }, (err, transaction) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Transaction successfully deleted" });
  });
};