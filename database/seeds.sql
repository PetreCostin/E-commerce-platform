-- E-Commerce Platform Sample Data
-- PostgreSQL Seed Data Script
-- This script inserts sample data for testing and development

-- Insert sample users with BCrypt hashed passwords
-- Password for all users: "password123"
-- BCrypt hash: $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LQv3c1yqBWVHxkd0L

INSERT INTO users (username, email, password, first_name, last_name, is_enabled) VALUES
('admin', 'admin@ecommerce.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LQv3c1yqBWVHxkd0L', 'Admin', 'User', TRUE),
('john_doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LQv3c1yqBWVHxkd0L', 'John', 'Doe', TRUE),
('jane_smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LQv3c1yqBWVHxkd0L', 'Jane', 'Smith', TRUE),
('bob_wilson', 'bob@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LQv3c1yqBWVHxkd0L', 'Bob', 'Wilson', TRUE)
ON CONFLICT (username) DO NOTHING;

-- Assign roles to users
INSERT INTO user_roles (user_id, role) VALUES
((SELECT id FROM users WHERE username = 'admin'), 'ROLE_ADMIN'),
((SELECT id FROM users WHERE username = 'admin'), 'ROLE_USER'),
((SELECT id FROM users WHERE username = 'john_doe'), 'ROLE_USER'),
((SELECT id FROM users WHERE username = 'jane_smith'), 'ROLE_USER'),
((SELECT id FROM users WHERE username = 'bob_wilson'), 'ROLE_USER')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category, stock_quantity, is_active) VALUES
-- Electronics
('Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 79.99, 'Electronics', 50, TRUE),
('Smart Watch', 'Feature-rich smartwatch with fitness tracking and heart rate monitor', 199.99, 'Electronics', 30, TRUE),
('Bluetooth Speaker', 'Portable waterproof speaker with amazing sound quality', 49.99, 'Electronics', 75, TRUE),
('Laptop Stand', 'Ergonomic aluminum laptop stand for better posture', 39.99, 'Electronics', 100, TRUE),
('USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader', 29.99, 'Electronics', 120, TRUE),

-- Clothing
('Running Shoes', 'Lightweight running shoes with excellent cushioning for all terrains', 89.99, 'Clothing', 60, TRUE),
('Winter Jacket', 'Warm and stylish winter jacket with water-resistant fabric', 149.99, 'Clothing', 40, TRUE),
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt in various colors', 19.99, 'Clothing', 200, TRUE),
('Yoga Pants', 'Stretchy and breathable yoga pants perfect for workouts', 44.99, 'Clothing', 80, TRUE),

-- Home & Garden
('Coffee Maker', 'Programmable coffee maker with thermal carafe', 79.99, 'Home & Garden', 45, TRUE),
('Bed Sheets Set', 'Luxurious 1800 thread count bed sheets set', 59.99, 'Home & Garden', 35, TRUE),
('Indoor Plant Pot', 'Decorative ceramic plant pot with drainage hole', 24.99, 'Home & Garden', 90, TRUE),

-- Sports & Outdoors
('Yoga Mat', 'Non-slip exercise yoga mat with carrying strap', 29.99, 'Sports & Outdoors', 110, TRUE),
('Water Bottle', 'Insulated stainless steel water bottle keeps drinks cold for 24 hours', 24.99, 'Sports & Outdoors', 150, TRUE),
('Camping Tent', '4-person waterproof camping tent with easy setup', 159.99, 'Sports & Outdoors', 25, TRUE),

-- Books
('Python Programming Guide', 'Comprehensive guide to Python programming for beginners', 34.99, 'Books', 70, TRUE),
('Web Development Basics', 'Learn HTML, CSS, and JavaScript from scratch', 29.99, 'Books', 85, TRUE),

-- Accessories
('Leather Backpack', 'Stylish leather backpack with laptop compartment', 89.99, 'Accessories', 55, TRUE),
('Sunglasses', 'UV protection polarized sunglasses', 39.99, 'Accessories', 95, TRUE),
('Wrist Watch', 'Classic analog wrist watch with leather strap', 129.99, 'Accessories', 40, TRUE)
ON CONFLICT DO NOTHING;

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES
((SELECT id FROM users WHERE username = 'john_doe'), 199.95, 'DELIVERED', '123 Main St, New York, NY 10001'),
((SELECT id FROM users WHERE username = 'john_doe'), 199.99, 'SHIPPED', '123 Main St, New York, NY 10001'),
((SELECT id FROM users WHERE username = 'jane_smith'), 149.97, 'PROCESSING', '456 Oak Ave, Los Angeles, CA 90001'),
((SELECT id FROM users WHERE username = 'bob_wilson'), 89.99, 'PENDING', '789 Pine Rd, Chicago, IL 60601');

-- Insert order items for the orders
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- John's first order (delivered)
(1, (SELECT id FROM products WHERE name = 'Wireless Headphones'), 1, 79.99),
(1, (SELECT id FROM products WHERE name = 'USB-C Hub'), 4, 29.99),

-- John's second order (shipped)
(2, (SELECT id FROM products WHERE name = 'Smart Watch'), 1, 199.99),

-- Jane's order (processing)
(3, (SELECT id FROM products WHERE name = 'Running Shoes'), 1, 89.99),
(3, (SELECT id FROM products WHERE name = 'Yoga Mat'), 2, 29.99),

-- Bob's order (pending)
(4, (SELECT id FROM products WHERE name = 'Leather Backpack'), 1, 89.99);

-- Update product statistics
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE name = 'Wireless Headphones';
UPDATE products SET stock_quantity = stock_quantity - 4 WHERE name = 'USB-C Hub';
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE name = 'Smart Watch';
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE name = 'Running Shoes';
UPDATE products SET stock_quantity = stock_quantity - 2 WHERE name = 'Yoga Mat';
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE name = 'Leather Backpack';

-- Display summary
SELECT 'Database seeded successfully!' AS status;
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(*) AS total_orders FROM orders;
