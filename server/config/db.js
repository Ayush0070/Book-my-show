 const mongoose = require('mongoose');

 const dbURL=process.env.DB_URL;
 (dbURL);

 const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;