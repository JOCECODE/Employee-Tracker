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
                        SELECT ALL e.employee_id, e.first_name, e.last_name, title, name, salary, concat(m.first_name, " ", m.last_name) AS manager
                        FROM employee e
                                INNER JOIN role 
USING (role_id)
                                INNER JOIN department
USING (department_id)
                                LEFT JOIN employee m  
USING (manager_id)  
                        ORDER BY e.employee_id;




                        -- ----------------------------------------------------------------------------

                        -- ----------------------------------------------------------------------------


                        CREATE DATABASE cms_db;

                        use cms_db;

                        CREATE TABLE department
                        (
                                department_id INT NOT NULL
                                AUTO_INCREMENT,
name VARCHAR
                                (30) NOT NULL,
PRIMARY KEY
                                (department_id)
);
                                INSERT INTO department
                                        (name)
                                VALUES
                                        ("AUTOMOTIVES"),
                                        ("KITCHENWARE"),
                                        ("ELECTRONICS"),
                                        ("GARDEN"),
                                        ("MEN'S APPAREL"),
                                        ("WOMEN'S APPAREL");
                                SELECT *
                                FROM department;
                                -- DELETE FROM department WHERE departmentid = 1;





                                CREATE TABLE role
                                (
                                        role_id INT NOT NULL
                                        AUTO_INCREMENT,
title VARCHAR
                                        (30) NOT NULL,
salary DECIMAL
                                        (9,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY
                                        (role_id),
CONSTRAINT FK_DepartmentRole FOREIGN KEY
                                        (department_id)
REFERENCES department
                                        (department_id)
);

                                        INSERT INTO role
                                                (title, salary, department_id)
                                        VALUES
                                                ("cashier", 28575, 1),
                                                ("stocker", 24475, 5),
                                                ("sales-associate", 26999, 6),
                                                ("sales-representative", 28972, 2),
                                                ("software-engineer", 84175, 3),
                                                ("groundskeeper", 30000, 4),
                                                ("mechanic", 44714, 1),
                                                ("manager", 35513, 5),
                                                ("baker", 36000, 2),
                                                ("custodian", 26679, 6),
                                                ("tech-support", 44444, 3),
                                                ("plumber", 38197.34, 2),
                                                ("oil-lube", 30000, 1),
                                                ("lead-engineer", 108008, 3),
                                                ("fragrance-associate", 26179, 6),
                                                ("electrician", 47890, 2),
                                                ("retail-organizer", 29999, 6),
                                                ("line-cook", 34898, 2);

                                        SELECT *
                                        FROM role;
                                        -- DELETE FROM role WHERE roleid = 1;


                                        CREATE TABLE employee
                                        (
                                                employee_id INT NOT NULL
                                                AUTO_INCREMENT,
first_name VARCHAR
                                                (30) NOT NULL,
last_name VARCHAR
                                                (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY
                                                (employee_id),
CONSTRAINT FK_RoleEmployee FOREIGN KEY
                                                (role_id)
REFERENCES role
                                                (role_id),
CONSTRAINT FK_ManagerEmployee FOREIGN KEY
                                                (manager_id) 
REFERENCES employee
                                                (employee_id))
;

                                                INSERT INTO employee
                                                        (first_name, last_name, role_id, manager_id)
                                                VALUE
                                                ("Javier",
                                                "Gomez",
                                                2,
                                                3
                                                );
                                                -- VALUES ("Jesse", "Frausto", 14, NULL),("Mikel", "Perez", 16, NULL),("Antonio", "Espinoza", 8, NULL),("Samantha", "Hernandez", 1, NULL),("Cristobal", "Hernandez", 2, NULL),("Alyssa", "Valdez", 3, NULL),("Jose", "Espinoza", 7, NULL),("Esteban", "Rivera", 5, NULL),("Ulices", "Sandoval", 6, NULL),("Sinbad", "Larkson", 4, NULL),("Anthony", "Hopkins", 9, NULL),("Jimmy", "Castro", 10, NULL),("Veronica", "Cortez", 11, NULL),("Gene", "Shalit", 12, NULL),("Elizabeth", "Swank", 13, NULL),("Ariana", "Qaurter", 15, NULL),("Henry", "Smith", 17, NULL),("David", "Ling", 18, NULL),("Monica", "Defoe", 1, NULL),("William", "Feusier", 2, NULL),("Janet", "Knoles", 3, NULL),("Hardy", "Timothy", 4, NULL),("Jorga", "Smith", 5, NULL),("Steve", "Nash", 6, NULL),("Cecilia", "Perez", 7, NULL),("Alex", "Lillypad", 9, NULL),("Oscar", "Tolama", 10, NULL),("Theodore", "Armstrong", 11, NULL),("Fuscia", "Cabinet", 12, NULL),("Anne", "Perkins", 13, NULL);
                                                -- DELETE FROM employee WHERE employeeid = 1;

                                                -- SELECT ALL EMPLOYEES  

                                                SELECT ALL e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name", title AS "Job-Title", name AS "Department", salary AS "Salary", concat(m.first_name, " ", m.last_name) AS "Manager"
                                                FROM employee e
                                                        INNER JOIN role 
USING (role_id)
                                                        INNER JOIN department
USING (department_id)
                                                        LEFT JOIN employee m  
USING (manager_id)  
                                                ORDER BY e.employee_id;

                                                SELECT name AS "Department", e.employee_id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name"
                                                FROM employee e
                                                        INNER JOIN role
USING (role_id)
                                                        INNER JOIN department
USING (department_id)  
                                                ORDER BY department_id;

                                                USE cms_dbs;

                                                SELECT concat(m.first_name, " ", m.last_name) AS "Employees"
                                                FROM role e
                                                        JOIN role m
                                                        ON e.manager_id != m.employee_id;

                                                SELECT ALL title AS "Job-Title", role_id AS "ID", salary AS "Salary", name AS "Department"
                                                FROM role
                                                        JOIN department
                                                        ON department.department_id = role.department_id
                                                ORDER BY role_id;

                                                SELECT role_id, title AS Roles
                                                FROM role
                                                ORDER BY role_id;

                                                SELECT *
                                                FROM employee;
                                                INSERT INTO employee
                                                        (first_name, last_name, role_id, manager_id)
                                                VALUE
                                                ("Danny",
                                                "Devito",
                                                "2",
                                                NULL
                                                );

                                                SELECT title AS Roles
                                                FROM role
                                                ORDER BY role_id;


                                                DELETE FROM employee
    WHERE employee_id = 32



                                                SELECT m.employee_id, concat(m.first_name, " ", m.last_name) AS "Employees"
                                                FROM employee e
                                                        JOIN employee m
                                                        ON e.manager_id != m.employee_id
                                                ORDER BY employee_id;

                                                SELECT *
                                                FROM employee
                                                ORDER BY employee_id;



                                                DROP DATABASE IF EXISTS top_songsDB;
                                                CREATE database top_songsDB;

                                                USE top_songsDB;

                                                CREATE TABLE top5000
                                                (
                                                        position INT NOT NULL,
                                                        artist VARCHAR(100) NULL,
                                                        song VARCHAR(100) NULL,
                                                        year INT NULL,
                                                        raw_total DECIMAL(10,4) NULL,
                                                        raw_usa DECIMAL(10,4) NULL,
                                                        raw_uk DECIMAL(10,4) NULL,
                                                        raw_eur DECIMAL(10,4) NULL,
                                                        raw_row DECIMAL(10,4) NULL,
                                                        PRIMARY KEY (position)
                                                );

                                                CREATE TABLE top_albums
                                                (
                                                        position INT NOT NULL,
                                                        artist VARCHAR(100) NULL,
                                                        album VARCHAR(100) NULL,
                                                        year INT NULL,
                                                        raw_total DECIMAL(10,4) NULL,
                                                        raw_usa DECIMAL(10,4) NULL,
                                                        raw_uk DECIMAL(10,4) NULL,
                                                        raw_eur DECIMAL(10,4) NULL,
                                                        raw_row DECIMAL(10,4) NULL,
                                                        PRIMARY KEY (position)
                                                );

                                                SELECT *
                                                FROM top5000;
                                                select *
                                                from top_albums;

