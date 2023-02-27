USE business_db;

INSERT INTO departments (id,name)
VALUES (1,'Engineering'),
       (2,'Sales'),
       (3,'Finance');

INSERT INTO rolls (id,title, salary, department_id)
VALUES (10,'Head Engineer', 150000,1),
       (11,'Engineer', 100000, 1),
       (12,'Intern Engineer', 40000, 1),
       (20,'Sales Lead', 170000, 2),
       (21,'Sales Person', 120000, 2),
       (30,'Account Manager', 200000, 3),
       (31,'Accountant', 150000, 3);

INSERT INTO employees (id,first_name, last_name, roll_id, manager_id)
VALUES (1,'Bob','Hancho',10,NULL),
       (2,'John','Doe',11,1),
       (3,'Rupert','Swanson',11,1),
       (4,'Gilbert','Gibson',11,1),
       (5,'Waterson', 'Richards',12,1),
       (6,'Rachel','Roberts',20,NULL),
       (7,'Rebekah','Scott',21,6),
       (8,'Brodi','Bagson',21,6),
       (9,'Gertrude','Kromer',21,6),
       (10,'Hilbert','Bertson',20,NULL),
       (11,'Gilbert','Bertson',21,10),
       (12,'Hughbert','Bertson',21,10),
       (13,'Dilbert','Bertson',21,10),
       (14,'Bose','Biggs',30,NULL),
       (15,'Buck','Douh',31,14),
       (16,'Cashe','Muns',31,14)