-- TODO: ADD DEPARTMENTS (AUTOMOTIVES, KITCHENWARE, ELECTRONICS, GARDEN, MEN'S APPAREL, WOMEN'S APPAREL)
-- TODO: ADD EMPLOYEES WHICH INCLUDE (first_name, last_name, role_id, manager_id) (JOSE PEREZ, MIKEL PEREZ, JESUS LOZOYA, RUTH LOZANO, ANOTONIO ESPINOZA, SAMANTHA HERNANDEZ, ESTEBAN RIVERA, LARRY RAMIREZ, LOGAN HENRY)
-- TODO: ADD ROLES WHICH INCLUDE(title, salary, department_id) (cashier, stocker, sales-associate, sales-representative, customer-service, mechanic, software engineer, manager, baker, custodian, tech-support)
use cms_db;

INSERT INTO department
    (name)
VALUE("Jesse");


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jesse", "Frausto", 1, NULL);


INSERT INTO role
    (title, salary, department_id)
VALUES
    ("THE SWEETEST", 999999.99, 1);

