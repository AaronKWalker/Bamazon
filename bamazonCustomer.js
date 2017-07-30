var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});


function connectToDB(){
  connection.connect(function(err){
    if (err) throw err;
    displayItems();
  });
}


function displayItems(){

  console.log("Here are today's deals!\n");
  connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  var table = new Table({
    head: ['NO.','NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']
  , colWidths: [5,35, 30, 20, 20]
  });
  for (var i = 0; i < res.length; i++) {
    table.push(
      [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
    );
  }
  console.log(table.toString());
  userPrompt();
});//--connection.query--
}//--displayItems--


function userPrompt(){

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log("|||||||||||||||||||||||||||||||||||||||");
    inquirer.prompt([
      {
        name: "userChoice",
        type: "list",
        choices: function(){
          var choiceArr = [];
          for (var j = 0; j < results.length; j++) {
            choiceArr.push(results[j].product_name);
          }
          return choiceArr;
        },
        message: "Which item would you like to purchase?"
      }
    ]).then(function(answer){
      console.log(answer.userChoice);
      //connection.end();
    });//--.then--
  });//--connection.query--

}//--userPrompt--


//-_-_-_-_-_-_-_-_-_-_-_-_[TESTING FUNCTION CALLS]_-_-_-_-_-_-_-_-_-_-_-_-//
displayItems();
