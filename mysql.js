// *! MAKE SURE THE TABLES ARE POPULATED WITH ALL THE INFO BEFORE STARTING HERE (schema.sql, seeds.sql)
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "5531",
  database: "cms_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runStart();
});

function runStart() {
  inquirer
    .prompt({
      name: "firstQuestion",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "view all employees by department",
        "view all employees by manager",
        "add employee",
        "add department",
        "remove employee",
        "update employee role",
        "update employee manager",
        "view all roles",
        "add role",
        "remove role",
      ],
    })
    .then(function (answer) {
      switch (answer.firstQuestion) {
        case "view all employees":
          allEmployees();
          break;

        case "view all employees by department":
          departmentEmployees();
          break;

        case "view all employees by manager":
          managerEmployees();
          break;

        case "add employee":
          addEmployee();
          break;

        case "add department":
          addDepartment();
          break;

        case "remove employee":
          removeEmployee();
          break;

        case "update employee role":
          roleUpdate();
          break;

        case "update employee manager":
          managerUpdate();
          break;

        case "view all roles":
          viewRoles();
          break;

        case "add role":
          addRole();
          break;

        case "remove role":
          removeRole();
          break;
      }
    });
}

function allEmployees() {
  console.log("display all employees from the database");
  console.log("display all employees from the database");
  console.log("display all employees from the database");
  runStart();
}

function departmentEmployees() {
  console.log("display all employees by department");
  console.log("display all employees by department");
  console.log("display all employees by department");
  runStart();
}

function managerEmployees() {
  console.log("display all managers employees");
  console.log("display all managers employees");
  console.log("display all managers employees");
  runStart();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleChoice",
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
      {
        name: "managerChoice",
        type: "list",
        message: "Who is the employee's manager?",
        choices: [
          "Display All Managers From The Database should be an array",
          "THE FOLLOWING UNDER ARE HARD CODED",
          "SALLIE MAE",
          "SVETLENA",
          "Tiger King",
          "Never Enough",
          "the stars of the night sky",
        ],
      },
    ])
    .then(function (answer) {
      runStart();
    });
}

//*! LOOK INTO QUERY OF ADDING A NEW DEPARTMENT FROM SQL TO INCORPORATE INTO HERE LOOK AT EXAMPLE 14 WEEK 12
function addDepartment() {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What department do you want to add",
    })
    .then(function (answer) {
      console.log(answer);
      console.log("success! The department was added!");
      runStart();
    });
}

// *! USE THE DELETE FROM THE SCHEMA TO SELECT ALL EMPOLOYEES AND DELETE BY CHOICE USING AN ARRAY POSSIBLY
function removeEmployee() {
  inquirer
    .prompt({
      name: "removeEmployee",
      type: "list",
      message: "Who is the employee's manager?",
      choices: [
        "there should be an array with all employees from the database",
        "after selecting a choice, console log confirmation",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      console.log("removeEmployee success");
      runStart();
    });
}

function roleUpdate() {
  inquirer
    .prompt([
      {
        name: "roleUpdate",
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: ["there should be an array", "of all employees"],
      },
      {
        name: "roleChoice",
        type: "list",
        message: "What role do you want to assign this employee?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
    ])
    .then(function (answer) {
      console.log(answer);
      console.log("updated employee");
      runStart();
    });
}

//*! HOW TO DISPLAY ALL EMPLOYEES WITHOUT MANAGER TO BE CHOSEN THEN UPDATE THE CHOSEN EMPLOYEE WITH A NEW MANAGER
function managerUpdate() {
  inquirer
    .prompt([
      {
        name: "managerUpdate",
        type: "list",
        message: "Which employee's manager do you want to update?",
        choices: [
          "should display an array of all manager's from the database",
          "then the next",
        ],
      },
      {
        name: "managerChoice",
        type: "list",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        choices: [
          "should be an array",
          "of employees not as a manger currently",
        ],
      },
    ])
    .then(function (answer) {
      console.log(answer);
      runStart();
    });
}

// *! DISPLAY ALL ROLES START WITH THIS AND USE THE SCHEMA AS REFERENCE USE SQL TO BE ABLE TO TEST ON THERE
function viewRoles() {
  inquirer
    .prompt({
      name: "viewRoles",
      type: "list",
      message: "Here are all the roles in the database.",
      choices: [
        "Sales Lead SHOULD BE AN ARRAY FROM THE DATABASE TO ADD AND REMOVE ROLES",
        "Salesperson",
        "Lead Engineer",
        "Software",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      runStart();
    });
}

function addRole() {
  inquirer
    .prompt({
      name: "addRole",
      type: "input",
      message: "What NEW role do you want to add?",
    })
    .then(function (answer) {
      console.log(answer);
      console.log("successfully added");
      runStart();
    });
}

function removeRole() {
  inquirer
    .prompt({
      name: "removeRole",
      type: "list",
      message: "What role do you want to remove?",
      choices: [
        "Sales Lead SHOULD BE AN ARRAY FROM THE DATABASE TO ADD AND REMOVE ROLES",
        "Salesperson",
        "Lead Engineer",
        "Software",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      console.log("successfully removed");
      runStart();
    });
}
