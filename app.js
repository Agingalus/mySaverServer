const express = require("express");
const bodyParser = require("body-parser");
const transactionsController = require("./controllers/transactionsController");
const recurringTransactionsController = require("./controllers/recurringTransactionsController");
const accountsController = require("./controllers/accountsController");
const budgetsController = require("./controllers/budgetsController");
const categoriesController = require('./controllers/categoriesController')
const cors = require('cors') // using this module to solve CORS problem
    // note the extra line in package.json to download this code
var postman = require('postman'); //use this package for testing


var corsOptions = {
    origin: ['https://mysaver.azurewebsites.net', 'mysaver.azurewebsites.net', 'http://localhost:4200'], // this URL must match the URL that the Angular app will call from
    //origin: 'kurtangularappfall2019.azurewebsites.net',   // this URL must match the URL that the Angular app will call from
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

// this brings in and sets up the monog db instance connection
require("./config/db");

//this is for finding by value
var url = require('url');
var address = 'http://localhost:8080/index.php?type=page&action=update&id=5221';
var q = url.parse(address, true);

const app = express();

//const port = process.env.PORT || 3000;  // setting the port number for this server
const port = process.env.PORT || 80; // setting the port number for this server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors(corsOptions)) // bringing in the CORS code to our app

// API ENDPOINTS
// not using the Express Router code, instead just listing them
// each of these 5 routed call one of the 5 methods defined in transactionsController
// which in turn call Mongo Atlas, each of those 5 do a return to the client
// notive they are "keyed", but HTTP request type, get, put, etc

//Transactions 
app
    .route("/transactions")
    .get(transactionsController.listAllTransactions)
    .post(transactionsController.createNewTransaction);

app
    .route("/transactions/:_id")
    .get(transactionsController.readTransaction)
    .put(transactionsController.updateTransaction)
    .delete(transactionsController.deleteTransaction);
app
//.route("/transactionsfindbyvalues?:values")
    .route("/transactionsfindbyvalues/:values")
    .get(transactionsController.findTransactionsByValues)

//Recurring Transactions
app
    .route("/recurringTransactions")
    .get(recurringTransactionsController.listAllRecurringTransactions)
    .post(recurringTransactionsController.createNewRecurringTransaction);

//Accounts
app
    .route("/accounts")
    .get(accountsController.listAllAccounts)
    .post(accountsController.createNewAccount)

app
    .route("/accounts/:_id")
    .delete(accountsController.deleteAccount)
    .put(accountsController.editAccounts)

//Budgets
app
    .route("/budgets")
    .get(budgetsController.listAllBudgets);

//Categories
app
    .route("/categories")
    .get(categoriesController.listAllCategories)
    .post(categoriesController.createNewCategories);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});