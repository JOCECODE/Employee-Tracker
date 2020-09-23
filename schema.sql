CREATE DATABASE cms_db;

use cms_db;

CREATE TABLE department
(
        departmentid INT NOT NULL
        AUTO_INCREMENT,
name VARCHAR
        (30) NOT NULL,
PRIMARY KEY
        (departmentid)
);


        DELETE FROM department WHERE departmentid = 2;




        CREATE TABLE role
        (
                roleid INT NOT NULL
                AUTO_INCREMENT,
title VARCHAR
                (30) NOT NULL,
salary DECIMAL
                (9,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY
                (roleid),
CONSTRAINT FK_DepartmentRole FOREIGN KEY
                (department_id)
REFERENCES department
                (departmentid)
);



                DELETE FROM role WHERE roleid = 1;


                CREATE TABLE employee
                (
                        employeeid INT NOT NULL
                        AUTO_INCREMENT,
first_name VARCHAR
                        (30) NOT NULL,
last_name VARCHAR
                        (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY
                        (employeeid),
CONSTRAINT FK_RoleEmployee FOREIGN KEY
                        (role_id)
REFERENCES role
                        (roleid),
CONSTRAINT FK_ManagerEmployee FOREIGN KEY
                        (manager_id) 
REFERENCES employee
                        (employeeid))
;

                        DELETE FROM employee WHERE employeeid = 1;


                        -- HOW TO SELECT TABLES FROM MYSQL
                        SELECT *
                        FROM role;
                        SELECT *
                        FROM department;
                        SELECT *
                        FROM employee;


