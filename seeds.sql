
    INSERT INTO department
        (name)
    VALUES
        ("AUTOMOTIVES"),
        ("KITCHENWARE"),
        ("ELECTRONICS"),
        ("GARDEN"),
        ("MEN'S APPAREL"),
        ("WOMEN'S APPAREL");

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

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Jesse", "Frausto", 14, NULL),
                ("Mikel", "Perez", 16, NULL),
                ("Antonio", "Espinoza", 8, NULL),
                ("Samantha", "Hernandez", 1, NULL),
                ("Cristobal", "Hernandez", 2, NULL),
                ("Alyssa", "Valdez", 3, NULL),
                ("Jose", "Espinoza", 7, NULL),
                ("Esteban", "Rivera", 5, NULL),
                ("Ulices", "Sandoval", 6, NULL),
                ("Sinbad", "Larkson", 4, NULL),
                ("Anthony", "Hopkins", 9, NULL),
                ("Jimmy", "Castro", 10, NULL),
                ("Veronica", "Cortez", 11, NULL),
                ("Gene", "Shalit", 12, NULL),
                ("Elizabeth", "Swank", 13, NULL),
                ("Ariana", "Qaurter", 15, NULL),
                ("Henry", "Smith", 17, NULL),
                ("David", "Ling", 18, NULL),
                ("Monica", "Defoe", 1, NULL),
                ("William", "Feusier", 2, NULL),
                ("Janet", "Knoles", 3, NULL),
                ("Hardy", "Timothy", 4, NULL),
                ("Jorga", "Smith", 5, NULL),
                ("Steve", "Nash", 6, NULL),
                ("Cecilia", "Perez", 7, NULL),
                ("Alex", "Lillypad", 9, NULL),
                ("Oscar", "Tolama", 10, NULL),
                ("Theodore", "Armstrong", 11, NULL),
                ("Fuscia", "Cabinet", 12, NULL),
                ("Anne", "Perkins", 13, NULL);
