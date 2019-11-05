// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection is in (mySaverDB)
const dbURI =
  "mongodb+srv://mySaverUser:40uJHycVRtkU3zwC@tangerine-birp8.mongodb.net/mySaverDB?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// bring in our mongoose schema defintion defintion for a Transactions
require("../models/transactions");
require("../models/recurringTransactions");
require("../models/accounts");
require("../models/budgets");