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