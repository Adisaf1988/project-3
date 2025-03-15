-- Create the schema
CREATE SCHEMA vacations;

-- Use the schema
USE vacations;

-- Create the users table
CREATE TABLE users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the vacations table
CREATE TABLE all_vacations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    vacation_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the follows table for tracking user's favorite vacations
CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    followers_id INT NOT NULL,
    vacation_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vacation_id) REFERENCES all_vacations(id) ON DELETE CASCADE,
    FOREIGN KEY (followers_id) REFERENCES users(users_id) ON DELETE CASCADE
);

-- Insert an admin user (password: admin123)
INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$PH.tH3S4RFe3QSPjPw1qZ.LG4D8CXVGNLw4jUW4Q5UYe7nxhwIS8.', 'admin');

-- Insert sample vacation packages
INSERT INTO all_vacations (destination, description, start_date, end_date, price, vacation_photo) VALUES 
('Paris, France', 'Romantic getaway in the City of Light. Visit the Eiffel Tower, Louvre Museum, and enjoy French cuisine.', '2024-06-15', '2024-06-22', 1299.99, 'paris.jpg'),
('Maldives', 'Luxury beach vacation in paradise. Crystal clear waters, overwater bungalows, and world-class snorkeling.', '2024-07-01', '2024-07-08', 2499.99, 'maldives.jpg'),
('Barcelona, Spain', 'Discover Gaudi''s architecture, enjoy tapas, and relax on Mediterranean beaches.', '2024-09-05', '2024-09-12', 1199.99, 'barcelona.jpg'),
('Tokyo, Japan', 'Experience the perfect blend of tradition and modernity. Explore temples, try sushi, and visit anime districts.', '2024-08-10', '2024-08-18', 1899.99, 'tokyo.jpg'),
('Swiss Alps', 'Mountain adventure with skiing, hiking, and breathtaking views. Stay in a cozy chalet.', '2024-12-20', '2024-12-27', 1799.99, 'swiss_alps.jpg'),
('Bali, Indonesia', 'Tropical paradise with beautiful beaches, ancient temples, and vibrant culture. Experience yoga retreats and rice terraces.', '2024-05-10', '2024-05-18', 1599.99, 'bali.jpg'),
('New York City, USA', 'The Big Apple adventure! Broadway shows, Central Park, Times Square, and world-class shopping.', '2024-10-01', '2024-10-07', 1699.99, 'nyc.jpg'),
('Safari, Kenya', 'African wildlife adventure in the Masai Mara. See the big five and witness the great migration.', '2024-08-20', '2024-08-28', 2899.99, 'kenya.jpg'),
('Greek Islands', 'Island hopping in the Aegean Sea. Visit Santorini, Mykonos, and ancient ruins.', '2024-07-15', '2024-07-23', 1999.99, 'greece.jpg'),
('Dubai, UAE', 'Ultra-modern city experience. Desert safaris, Burj Khalifa, luxury shopping, and beach resorts.', '2024-11-10', '2024-11-17', 2199.99, 'dubai.jpg'),
('Rio de Janeiro, Brazil', 'Carnival city with stunning beaches, Christ the Redeemer, and vibrant nightlife.', '2024-02-15', '2024-02-22', 1799.99, 'rio.jpg'),
('Iceland Adventure', 'Northern Lights, hot springs, glaciers, and volcanic landscapes. Natural wonder exploration.', '2024-03-10', '2024-03-17', 2099.99, 'iceland.jpg');
