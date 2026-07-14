const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If you don't have a Mongo URI yet, it will connect to a local MongoDB by default
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-loan-system');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
