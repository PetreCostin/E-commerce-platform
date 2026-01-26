require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Order = require('./src/models/Order');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  }
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.5,
    numReviews: 120
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking and notifications.',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    rating: 4.7,
    numReviews: 85
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning and support.',
    price: 79.99,
    category: 'Sports',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    rating: 4.3,
    numReviews: 200
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe.',
    price: 49.99,
    category: 'Home',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    rating: 4.2,
    numReviews: 150
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable backpack with padded laptop compartment and multiple pockets.',
    price: 39.99,
    category: 'Accessories',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    rating: 4.6,
    numReviews: 95
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with powerful sound and waterproof design.',
    price: 59.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    rating: 4.4,
    numReviews: 110
  },
  {
    name: 'Yoga Mat',
    description: 'Premium yoga mat with excellent grip and cushioning.',
    price: 29.99,
    category: 'Sports',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    rating: 4.5,
    numReviews: 75
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and USB charging port.',
    price: 34.99,
    category: 'Home',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    rating: 4.3,
    numReviews: 65
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
    price: 24.99,
    category: 'Sports',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    rating: 4.7,
    numReviews: 180
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking.',
    price: 19.99,
    category: 'Electronics',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    rating: 4.2,
    numReviews: 140
  },
  {
    name: 'Sunglasses',
    description: 'Stylish sunglasses with UV protection.',
    price: 44.99,
    category: 'Accessories',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    rating: 4.4,
    numReviews: 90
  },
  {
    name: 'Kitchen Knife Set',
    description: 'Professional kitchen knife set with wooden block.',
    price: 89.99,
    category: 'Home',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
    rating: 4.8,
    numReviews: 55
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data');

    // Insert users
    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`Created ${createdUsers.length} users`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: john@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
