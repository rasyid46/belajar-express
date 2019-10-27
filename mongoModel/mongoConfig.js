require('dotenv').config()
const Mongoose = require("mongoose");
// const MONGODB_URI = process.env.MONGODB_URI
// Mongoose.connect(MONGODB_URI);
Mongoose.connect("mongodb://semangka:17agustus@ds239858.mlab.com:39858/heroku_4p38v2k5?retryWrites=false");
module.exports = Mongoose;
 