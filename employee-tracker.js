var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "RUNEscrap2020!!",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "toDo",
    //   list or input for type?
      type: "list",
      message: "WhWat would you like to do?",
      choices: ["Add Employee", "Add Department", "Add Role", "View All Employees", "View All Employees By Department", "View All Employees By Role", "Update Employee Role"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      switch(answer.toDo){
          case "Add Employee": 
          addEmployee()
          break
          case "Add Department": 
          addDepartment()
          break
          case "Add Role": 
          addRole()
          break
          case "View All Employees":
          viewAllEmployees()
          break
          case "View All Employees By Department":
          viewByDepartment()
          break
          case "View All Employees By Role":
          viewByRole()
          break
          case "Update Employee Role":
          updateRole()
          break
      }
    });
}

function addEmployee() {

}

function addDepartment() {
 inquirer.prompt([{
     type: "input",
     message: "Which department?",
     name: "department",
 }]).then(function(userinput){
     connection.query("INSERT INTO department(department_name) values(?)", userinput.department, function(error){
         if(error)throw error
         console.log("Department successfully added!")

        start()
     })
 })
}

function addRole() {
 inquirer.prompt([{
     type: "input",
     message: "Which title?",
     name: "title"

 },{
     type: "input",
     message: "Salary amount?",
     name: "salary"

 }, {
     type: "input",
     message: "Department ID?",
     name: "department_id"
 }]).then(function(userinput){
    connection.query("INSERT INTO role(title, salary, department_id) values(?, ?, ?)", [userinput.title, userinput.salary, userinput.department_id], function(error){
        if (error) throw error
        console.log("Role added successfully!")

        start()
    })
 })
}

function viewAllEmployees() {

}

function viewByDepartment() {
    connection.query("SELECT * FROM department", function(error, data){
        if(error) throw error
        console.table(data)

        start()
    })
    
}

function viewByRole() {
    connection.query("SELECT * FROM role", 
    function(error, data) {
        if(error) throw error
        console.table(data)

        start()
    })
}

function updateRole() {

}