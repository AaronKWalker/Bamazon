var mysql = require("mysql");
var inquirer = require("inquirer");
ar connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err){
  if (err) throw err;

});
