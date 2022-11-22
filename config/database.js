const mongoose = require('mongoose');
require("dotenv").config();

const dbConnection = async() => {
   //console.log("HOLIII " + process.env.MONGO_URI);
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      console.log('MongoDB connected');
   } catch (error) {
      console.log(error, 'Error connecting to MongoDB');
      throw new Error(error);
   }
}

module.exports = { dbConnection };