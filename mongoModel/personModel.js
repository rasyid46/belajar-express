const Mongoose = require('./mongoConfig')
var PersonModel = Mongoose.model('person', {
    firstname: { type: String, required: true },
    lastname:     { type: String, required: true }
  })
module.exports = PersonModel