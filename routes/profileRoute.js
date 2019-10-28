var express = require('express');
var router = express.Router(); 

const Mongoose = require('../mongoModel/mongoConfig')
const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
}); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('inie');
});

router.get('/list', async (req, res) => {
  // Do something here
  var person = await PersonModel.find().exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "List Person", 
      content : person
  } 
  res.json(response);
})

router.get('/detail/(:id)', async (req, res) => {
  const checkId = Mongoose.Types.ObjectId.isValid(req.params.id)
  let statusCode = 200
  let message ="Detail Person"
  if(checkId){
    var person = await PersonModel.findById(req.params.id).exec();
    if(!person){
      statusCode=404
      message="Data not found"
    }
  }else{
     statusCode = 404
     var person = null
     message ="Object Id invalid"
     var person = ""
  }
  const response = {
    statusCode : statusCode,
    error : message,
    message : message, 
    content : person
} 
res.status(statusCode).json(response);
  
})

router.post('/create', async (req, res) => {
  // Do something here
  if (!req.body.firstname) {
    res.status(400).json({
      statusCode : 400,
      error: "firstname parameter is required",
      message: "firstname parameter is required"
    });
  }

  if (!req.body.lastname) {
    res.status(400).json({
      statusCode : 400,
      error: "lastname parameter is required",
      message: "lastname parameter is required"
    });
  }
  console.log(req.body)
  var person = new PersonModel(req.body);
  var result = await person.save();
  const response = {
      statusCode : 200,
      error : "",
      message : "create Person", 
      content : result
  } 
  res.json(response);
})

router.put('/update/(:id)', async (req, res) => { 
  if (!req.body.firstname) {
    res.status(400).json({
      statusCode : 400,
      error: "firstname parameter is required",
      message: "firstname parameter is required"
    });
  }

  if (!req.body.lastname) {
    res.status(400).json({
      statusCode : 400,
      error: "lastname parameter is required",
      message: "lastname parameter is required"
    });
  }
  const checkId = Mongoose.Types.ObjectId.isValid(req.params.id)
  let statusCode = 200
  let message="Update Person"
  if(checkId){
    var person = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!person){
      statusCode=404
      message="Data not found"
    }
  }else{
    statusCode = 404;
    var person = null
    message="Object Id invalid"
  }
  const response = {
      statusCode : statusCode,
      error : message,
      message : message, 
      content : person
  } 
  res.status(statusCode).json(response);
})


router.get('/delete/(:id)', async (req, res) => {
  const checkId = Mongoose.Types.ObjectId.isValid(req.params.id)
  let statusCode = 200
  let message="Delete Person"
  if(checkId){
    var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
    if(!person){
      statusCode=404
      message="Data not found"
    }
  }else{
    statusCode=404
    message="Object Id invalid"
    var person = null
  }
  const response = {
      statusCode : statusCode,
      error : message,
      message : message, 
      content : person
  } 
  res.status(statusCode).json(response);
})
module.exports = router;
