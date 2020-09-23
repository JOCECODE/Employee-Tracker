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

