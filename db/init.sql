-- Create the schema
CREATE SCHEMA building_management_2;

-- Use the schema
USE building_management_2;

-- Create the tenants table
CREATE TABLE tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    apartmentNumber VARCHAR(10) NOT NULL,
    floor INT NOT NULL
);

-- Create the issues_categories table
CREATE TABLE issues_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

-- Create the issues table
CREATE TABLE issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenantId INT,
    description TEXT NOT NULL,
    categoryId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenantId) REFERENCES tenants(id),
    FOREIGN KEY (categoryId) REFERENCES issues_categories(id)
);

-- Populate the tenants table with example data
INSERT INTO tenants (firstName, lastName, email, phone, apartmentNumber, floor) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', '101', 1),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', '102', 1),
('Alice', 'Johnson', 'alice.johnson@example.com', '5555555555', '201', 2),
('Bob', 'Brown', 'bob.brown@example.com', '4444444444', '202', 2);

-- Populate the issues_categories table with example data
INSERT INTO issues_categories (category) VALUES
('Cleaning'),
('Parking'),
('Elevator Not Working');