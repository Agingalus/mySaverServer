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
  
  //Data needs to be sent in this format:
  //http://localhost/transactionsfindbyvalues/%7B%22Payee%22:%22BC%22%7D or
  //http://localhost/transactionsfindbyvalues/%7B%22Amount%22:626.98%7D
  //
  //References
  //https://jsoneditoronline.org/doc/index.html#query_parameters
  //
  //https://github.com/josdejong/jsoneditor/issues/334
  //"Yes you can do that with a query parameter json, for example:
  //http://jsoneditoronline.org/?json={%22name%22:%22John%22,%22age%22:32}"
  //In our case {"Amount":626.98,"Payee":"BC"}


  //var ObjectId = require('mongodb').ObjectId;
  var localvalues = req.params.values;
  console.log ("the values are, ", localvalues)       
  //var o_id = new ObjectId(id);
  //db.test.find({_id:o_id}) //notice the curly braces
 
  //var parsedlocalvaluesarray = localvalues.split("&");
  //console.log("parsedlocalvaluesarray is ", parsedlocalvaluesarray)

  //var myJsonObject = (JSON.stringify(localvalues));
  //console.log("myJsonObject is ", myJsonObject);

  //var myJsonObject = (JSON.parse(myJsonObject));
  //console.log("myJsonObject is ", myJsonObject);


  //localvalues = "{"+localvalues+"}";
  //myJsonObject = JSON.stringify(localvalues);
  myJsonObject = JSON.parse(localvalues);
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