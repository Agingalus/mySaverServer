// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection is in (mySaverDB)
const dbURI =
    "mongodb+srv://mySaverUser:40uJHycVRtkU3zwC@tangerine-birp8.mongodb.net/mySaverDB?retryWrites=true&w=majority";
// ?const dbURI =
// ?    "mongodb+srv://bcuser2:bcuser2@cluster0-nbt1n.mongodb.net/TaskDB?retryWrites=true&w=majority";
// const dbURI =
//     "mongodb+srv://mySaverUser:40uJHycVRtkU3zwC@tangerine-birp8.mongodb.net/Transactions";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.



//var connectionString = "mongodb+srv://mySaverUser:40uJHycVRtkU3zwC@tangerine-birp8.mongodb.net/";
// var mongoUrl = new MongoUrl(connectionString);
// var dbname = mongoUrl.DatabaseName;
// var db = new MongoClient(mongoUrl).GetDatabase(dbname);
// console.log("this is my database")
// console.log(db);



mongoose.set('useFindAndModify', false);

const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
};

mongoose.connect(dbURI,
    // { dbName: 'mySaverDB'}
).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

// bring in our mongoose schema defintion defintion for a Transactions
require("../models/transactions");