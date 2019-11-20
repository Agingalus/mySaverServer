const Categories = require("../models/categories");

exports.listAllCategories = (req, res) => {
    console.log(">>>>>>>>>>>>>> IN listAllCatagories <<<<<<<<<");
    Categories.find({}, (err, categories) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.status(200).json(categories);
        console.log(categories);
    });
};
exports.createNewCategories = (req, res) => {
    let newCategories = new Categories(req.body);
    console.log(newCategories);
    newCategories.save((err, Categories) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(Categories);
    });
};
exports.updateCategory = (req, res) => {
    console.log('Category id at server is ' + req.params._id);
    Categories.findOneAndUpdate(
      { _id: req.params._id },  // don't know who changed the name from _id
      req.body,
      { new: true },  // true or false to let it add if not present?
      (err, category) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log(category);
        res.status(200).json(category);
      }
    );
};

exports.deleteCategory = (req, res) => {
    console.log("Running delete category");

  
    //var ObjectId = require('mongodb').ObjectId;
    var ObjectId = require('mongodb').ObjectId

    var id = req.params._id;       
    var o_id = new ObjectId(id);
  
    //var myString = req.params._id;
    console.log("o_id is ", o_id, " of type ", typeof(o_id));
    
  
    Categories.find(o_id, (err, categories) => {
      //console.log("the {_id:o_id} is ", {_id:o_id});
      console.log("the o_id is ", o_id);
  
      if (err) {
        res.status(500).send(err);
      }
      //console.log("Response is", res);
  
      //console.log("First find result");
      //res.status(200).json(transaction)
      console.log(categories);
    });
  
    Categories.deleteOne({"_id":o_id}, (err, categories) => {  
      console.log("inside DeleteOne the id is ", o_id);
      
      if (err) {
        //res.status(404).send(err);
        res.status(500).send(err);
      }
      res.status(200).json({ message: "Category successfully deleted."});
    });
  
    Categories.find(o_id, (err, categories) => {
      //console.log("the {_id:o_id} is ", {_id:o_id});
      console.log("the o_id is ", o_id);
  
      if (err) {
        res.status(500).send(err);
      }
      //console.log("Response is", res);
  
      //res.status(200).json(transaction);
      console.log("Second find result");
      console.log(categories);
    });  
    
};