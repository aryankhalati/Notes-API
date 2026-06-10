const mongoose = require('mongoose'); //import mongoose library

const connectDB = async () => { // function will take time
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } // await wait for connection, then move frwd, dbname - notesapp
    catch (error) {
        console.log('MongoDB connection failed:', error);
        process.exit(1);
    } // if connection fail, catch, print error and exit, no api run 
    };

    module.exports = connectDB //index.js can import