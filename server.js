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
        "--EXIT--",
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

        case "--EXIT--":
          connection.end();
      }
    });
}

function allEmployees() {
  var query = `SELECT e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name", title AS "Job-Title", name AS "Department", salary AS "Salary", manager_id AS "Manager ID"
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

function departmentEmployees() {
  var query = `SELECT name AS "Department", e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name"
  FROM employee e
  INNER JOIN role
  USING (role_id)
  INNER JOIN department
  USING (department_id)
  ORDER BY department_id;`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}

function managerEmployees() {
  var query = `SELECT manager_id AS "Manager-ID", employee_id AS "Employee-ID", concat(first_name, " ", last_name) AS "Employee", role_id AS "Role-ID"FROM employee
  ORDER BY manager_id;`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`
    
    `);
    console.table(res);
    console.log(`Hit up or down (key) to continue`);
  });

  runStart();
}

function addEmployee() {
  let employeeArray = ["none"];
  let roleArray = [];
  let tester = [];
  let tester2 = [];
  var employeeQuery = `SELECT m.employee_id, concat(m.first_name, " ", m.last_name) AS "Employees", role_id, manager_id
  FROM employee m
  ORDER BY employee_id;`;
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
      if (answer.managerChoice == "none") {
        let newQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
        VALUES ("${answer.firstName}", "${answer.lastName}", "${
          check.role_id
        }", ${null});`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(
          `Success! ${answer.firstName} ${answer.lastName} was created successfully!`
        );
        runStart();
      }
      if (answer.managerChoice !== "none") {
        let newQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
      VALUES ("${answer.firstName}", "${answer.lastName}", "${check.role_id}", ${result.employee_id})`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(
          `Success! ${answer.firstName} ${answer.lastName} was created successfully!`
        );
        runStart();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What department do you want to add",
    })
    .then(function (answer) {
      let newQuery = `INSERT INTO department
      (name)
      VALUES
      ("${answer.addDepartment}");`;
      connection.query(newQuery, function (err, res) {
        if (err) throw err;
      });
      console.log(`${answer.addDepartment} has been added successfully!
      
      `);
      runStart();
    });
}

function removeEmployee() {
  function start() {
    inquirer
      .prompt({
        name: "removeEmployee",
        type: "list",
        message: "Which employee do you want to remove?",
        choices: removeChoices,
      })
      .then(function (answer) {
        let check = allEmployees.find((person) => {
          return person.Employees == answer.removeEmployee;
        });
        let newQuery = `DELETE FROM employee
        WHERE employee_id = ${check.employee_id}`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(`${answer.removeEmployee} was deleted successfully!
        
        `);
        runStart();
      });
  }
  let allEmployees = [];
  let removeChoices = [];
  var allQuery = `SELECT employee_id, concat(first_name, " ", last_name) AS "Employees"
  FROM employee 
    ORDER BY employee_id;`;
  connection.query(allQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      removeChoices.push(res[index].Employees);
      allEmployees.push(res[index]);
    }
    start();
  });
}

function roleUpdate() {
  function start() {
    inquirer
      .prompt([
        {
          name: "roleUpdate",
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: updateChoices,
        },
        {
          name: "roleChoice",
          type: "list",
          message: "What role do you want to assign this employee?",
          choices: roleChoices,
        },
      ])
      .then(function (answer) {
        let check = allEmployees.find((person) => {
          return person.Employees == answer.roleUpdate;
        });
        let checker = allRoles.find((role) => {
          return role.title == answer.roleChoice;
        });
        let newQuery = `UPDATE employee SET role_id = ${checker.role_id} WHERE employee_id = ${check.employee_id};`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(`${answer.roleUpdate} has been updated SUCCESSFULLY!
        
        `);
        runStart();
      });
  }
  let allEmployees = [];
  let updateChoices = [];
  let roleChoices = [];
  let allRoles = [];
  let allQuery = `SELECT employee_id, concat(first_name, " ", last_name) AS "Employees"
  FROM employee 
    ORDER BY employee_id;`;
  let roleQuery = `SELECT * FROM role;`;
  connection.query(allQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      updateChoices.push(res[index].Employees);
      allEmployees.push(res[index]);
    }
  });
  connection.query(roleQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      roleChoices.push(res[index].title);
      allRoles.push(res[index]);
    }
    start();
  });
}

function managerUpdate() {
  function start() {
    inquirer
      .prompt([
        {
          name: "managerUpdate",
          type: "list",
          message: "Which employee's manager do you want to update?",
          choices: choices,
        },
        {
          name: "managerChoice",
          type: "list",
          message:
            "Which employee do you want to set as the NEW manager for the selected employee?",
          choices: choices,
        },
      ])
      .then(function (answer) {
        let employeeManager = allEmployees.find((man) => {
          return man.Employees == answer.managerUpdate;
        });
        let newManager = allEmployees.find((newMan) => {
          return newMan.Employees == answer.managerChoice;
        });
        let newQuery = `UPDATE employee SET manager_id = ${employeeManager.employee_id} WHERE employee_id = ${newManager.employee_id};`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(
          `${answer.managerUpdate} has been updated SUCCESSFULLY!
          

          `
        );
        runStart();
      });
  }

  let allEmployees = [];
  let choices = [];
  let allQuery = `SELECT employee_id, concat(first_name, " ", last_name) AS "Employees", role_id, manager_id  FROM employee;`;
  connection.query(allQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      choices.push(res[index].Employees);
      allEmployees.push(res[index]);
    }
    start();
  });
}

function viewRoles() {
  var query = `SELECT title AS "Job-Title", role_id AS "ID", salary AS "Salary", name AS "Department"
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

function addRole() {
  departmentArray = [];
  depCheckerArray = [];
  var depQuery = `SELECT * FROM department;`;
  connection.query(depQuery, function (err, res) {
    if (err) throw err;

    for (let index = 0; index < res.length; index++) {
      departmentArray.push(res[index].name);
      depCheckerArray.push(res[index]);
    }
  });
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What is the title of the role you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the annual salary for this role?",
      },
      {
        name: "departmentChoice",
        type: "list",
        message: "Which department does this role belong to?",
        choices: departmentArray,
      },
    ])
    .then(function (answer) {
      let checker = depCheckerArray.find((dep) => {
        return dep.name == answer.departmentChoice;
      });
      let newQuery = `INSERT INTO role(title, salary, department_id)VALUES("${answer.addRole}", ${answer.salary}, ${checker.department_id});`;
      connection.query(newQuery, function (err, res) {
        if (err) throw err;
      });
      console.log(`Success! ${answer.addRole} has been added!
      
      `);
      runStart();
    });
}

function removeRole() {
  function begin() {
    inquirer
      .prompt({
        name: "removeRole",
        type: "list",
        message: "What role do you want to remove?",
        choices: arrayChoice,
      })

      .then(function (answer) {
        let checker = roleChecker.find((dep) => {
          return dep.title == answer.removeRole;
        });
        let newQuery = `DELETE FROM role WHERE role_id = ${checker.id};`;
        connection.query(newQuery, function (err, res) {
          if (err) throw err;
        });
        console.log(`"${answer.removeRole}" has been deleted!
        


        `);
        runStart();
      });
  }
  let roleChecker = [];
  let arrayChoice = [];
  var roleQuery = `SELECT role_id AS id, title FROM role;`;
  connection.query(roleQuery, function (err, res) {
    if (err) throw err;
    for (let index = 0; index < res.length; index++) {
      arrayChoice.push(res[index].title);
      roleChecker.push(res[index]);
    }
    begin();
  });
}
