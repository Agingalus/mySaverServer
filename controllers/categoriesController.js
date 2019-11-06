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