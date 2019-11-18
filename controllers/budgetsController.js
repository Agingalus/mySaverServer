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
exports.deleteBudget = (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.params._id;
    var o_id = new ObjectId(id);
    let Budget = new Budgets(req.body);
    Budget.deleteOne({ "_id": o_id }, (err, budget) => {
        console.log("inside DeleteOne the id is ", o_id);

        if (err) {
            //res.status(404).send(err);
            res.status(500).send(err);
        }
        res.status(200).json({ message: "Budget successfully deleted." });
    });
};
// exports.deleteTransaction = (req, res) => {


//     var ObjectId = require('mongodb').ObjectId;
//     var id = req.params._id;       
//     var o_id = new ObjectId(id);

//     console.log("o_id is ", o_id, " of type ", typeof(o_id));

//     Budget.find(o_id, (err, budget) => {

//       console.log("the o_id is ", o_id);

//       if (err) {
//         res.status(500).send(err);
//       }

//       console.log(budget);
//     });

//     //db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
//     //({student_staff_id:2})

//     //var uid = req.params._id;
//     //{'_id': ObjectId(uid)}

//     //id2 = 'ObjectID("'+id+'")';
//     //console.log(id2);

//     Budget.deleteOne({"_id":o_id}, (err, budget) => {  
//       console.log("inside DeleteOne the id is ", o_id);

//       if (err) {
//         //res.status(404).send(err);
//         res.status(500).send(err);
//       }
//       res.status(200).json({ message: "Budget successfully deleted."});
//     });

//     Budget.find(o_id, (err, budget) => {
//       //console.log("the {_id:o_id} is ", {_id:o_id});
//       console.log("the o_id is ", o_id);

//       if (err) {
//         res.status(500).send(err);
//       }
//       //console.log("Response is", res);

//       //res.status(200).json(budget);
//       console.log("Second find result");
//       console.log(budget);
//     });


//   };