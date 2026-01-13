const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const products = [
            {
                name: 'CakeZone Walnut Brownie',
                type: 'Foods',
                stock: 100,
                mrp: 150,
                sellingPrice: 120,
                brand: 'CakeZone',
                images: [],
                exchangeEligible: false,
                isPublished: true
            },
            {
                name: 'Sony WH-1000XM5',
                type: 'Electronics',
                stock: 50,
                mrp: 350,
                sellingPrice: 299,
                brand: 'Sony',
                images: [],
                exchangeEligible: true,
                isPublished: true
            },
            {
                name: 'Nike Air Max',
                type: 'Clothes',
                stock: 200,
                mrp: 120,
                sellingPrice: 100,
                brand: 'Nike',
                images: [],
                exchangeEligible: true,
                isPublished: false // Unpublished
            }
        ];

        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
