DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);