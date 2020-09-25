// *! MAKE SURE THE TABLES ARE POPULATED WITH ALL THE INFO BEFORE STARTING HERE (schema.sql, seeds.sql)
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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

// * ADDED IN QUERY
function allEmployees() {
  var query = `SELECT ALL e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name", title AS "Job-Title", name AS "Department", salary AS "Salary", concat(m.first_name, " ", m.last_name) AS "Manager"
  FROM employee e
  INNER JOIN role 
  USING (role_id)
  INNER JOIN department
  USING (department_id)
  LEFT JOIN employee m 
  USING (manager_id)
  ORDER BY e.employee_id;`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}

// * ADDED IN QUERY
function departmentEmployees() {
  var query = `SELECT name AS "Department", e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name"
  FROM employee e
  INNER JOIN role
  USING (role_id)
  INNER JOIN department
  USING (department_id)
  ORDER BY department_id;`;
  connection.query(query, function (err, res) {
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}

// * ADDED IN QUERY
function managerEmployees() {
  var query = `SELECT ALL concat(m.first_name, " ", m.last_name) AS "Manager"
  FROM employee e  
  JOIN employee m
    ON e.manager_id = m.employee_id;`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}
//* CONSOLE.LOG HAS QUERY TO CREATE A NEW EMPLOYEE
//TODO: LEFT TESTER CODE AND QUERY
function addEmployee() {
  let employeeArray = [];
  let roleArray = [];
  let tester = [];
  let tester2 = [];
  var employeeQuery = `SELECT m.employee_id, concat(m.first_name, " ", m.last_name) AS "Employees"
  FROM employee e  
  JOIN employee m
    ON e.manager_id != m.employee_id
    ORDER BY employee_id;    `;
  let roleQuery = `SELECT role_id, title AS Roles FROM role
  ORDER BY role_id;`;

  // QUERY TO GET ALL EMPLOYEES WITHOUT MANAGER
  connection.query(employeeQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      employeeArray.push(res[index].Employees);
      tester.push(res[index]);
    }
  });

  // QUERY TO GET ALL ROLES
  connection.query(roleQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      roleArray.push(res[index].Roles);
      tester2.push(res[index]);
    }
  });

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
        choices: roleArray,
      },
      {
        name: "managerChoice",
        type: "list",
        message: "Who is the employee's manager?",
        choices: employeeArray,
      },
    ])
    .then(function (answer) {
      let check = tester2.find((note) => {
        return note.Roles == answer.roleChoice;
      });

      let result = tester.find((obj) => {
        return obj.Employees == answer.managerChoice;
      });
      console.log(`SELECT * FROM employee; INSERT INTO employee(first_name, last_name, role_id, manager_id) 
      VALUE ("${answer.firstName}", "${answer.lastName}", "${check.role_id}", ${result.employee_id});`);

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
//! NEED TO DO THIS ONE
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

//* ADDED QUERY
function viewRoles() {
  var query = `SELECT ALL title AS "Job-Title", role_id AS "ID", salary AS "Salary", name AS "Department"
  FROM role
  JOIN department
    ON department.department_id = role.department_id
      ORDER BY role_id;`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}
//! NEED TO DO THIS ONE
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
//! NEED TO DO THIS ONE
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
