require('dotenv').config()
const Mongoose = require("mongoose");
const TYPE = process.env.TYPE || 'PROD'

const MONGODB_URI = process.env.MONGODB_URI
if(TYPE=="PROD"){
    Mongoose.connect("mongodb://semangka:17agustus@ds239858.mlab.com:39858/heroku_4p38v2k5?retryWrites=false");
}else{
    Mongoose.connect(MONGODB_URI);

}
module.exports = Mongoose;
 