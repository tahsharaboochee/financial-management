const mongoose = require('mongoose');
require('dotenv').config(); // Ensures that dotenv is available in this context

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Could not connect to MongoDB', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
