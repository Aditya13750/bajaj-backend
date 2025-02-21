require('dotenv').config();
const mongoose = require('mongoose');

const connectWithDB = async () => {
  try {
    const dbURL = process.env.dbURL;
    console.log(dbURL);
    await mongoose.connect(dbURL ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');
  } catch (e) {
    console.error('DB connection failed:', e);
    process.exit(1);
  }
};

module.exports = connectWithDB;
