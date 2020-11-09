var express = require('express');
var router = express.Router(); 
const jwksClient = require('jwks-rsa');

const jwt = require('jsonwebtoken');
 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('inie');
});
const client = jwksClient({
  
  jwksUri: 'https://appleid.apple.com/auth/keys',
   
});
function getAppleSignKey(kid){
  return new Promise((resolve)=>{
    client.getSigningKey(kid, (err, key) => {
      if(err){
        console.error(error)
        resolve(null)
      }
      const signingKey = key.getPublicKey(); 
       resolve(signingKey)
    })
  })
}

function verifyJWT(json, publicKey){
  return  new Promise((resolve) =>{
    jwt.verify(json,publicKey, (err,payload) =>{
      if(err){
        console.log('errrrr verifyJWT')
        return resolve(null)
      }
      resolve(payload)
    })

  })
}
router.get('/list', async (req, res) => {
  // Do something here
   let id_apple="eyJraWQiOiJlWGF1bm1MIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmZpbmFrdSIsImV4cCI6MTYwNTAwMDE2MiwiaWF0IjoxNjA0OTEzNzYyLCJzdWIiOiIwMDAxMTQuMTQ4NGQ2OTM2ODhmNGVkMzg0OWRjOWJiNDZhODIxM2YuMDQ0MCIsIm5vbmNlIjoiYzFhMGM1MzdiYzU0YTZlZDZiYzIzMTE3YzJhNGJhYjAwZDRiNjk0OGFiMzU3Y2FjNzMwOThhZWFmMzgxYjI3NyIsImNfaGFzaCI6InptVHRTWjI0eHRidmY0MEJmcE5IUUEiLCJlbWFpbCI6ImRpbWFzaHB0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTYwNDkxMzc2Miwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.NpsDCtrP_FwSHyVafn5m5A2IcKGeWtyx43zbKq1VlDnsqhd5F9I92rj-X1-NoRKE4BWl6vBFkwbFUM576ZVDLn8fP3tPAnMACEocft7sNADsOL6Nhl1TLv5q2UpDhJ4w8hFHReNJFzSyfakpLKlVWtX6nN8mYk6Ao7XTg0Yairb7gNpfb60GndTXgpxpS77_b7s_rykWmQyTv4j6z3X1mDZJslBGu7bWpCpOJ-MmQe_o0VqN5j_zAFPhOFzF6uyCdoPW0Blr4LLCwJ7aFyslSFB4Ct82imU34KPWxaw9L3qckfZLlpcFnkhxLwunA_Khh0JSDwpIdtwb_3XgLwihBQ";
   const json = jwt.decode(id_apple, {complete: true});

   const kid = json.header.kid
   const appleKeys = await getAppleSignKey(kid);
   
  if(!appleKeys){
    console.error('Error');
    return
  }
  const payload=  await verifyJWT(id_apple,appleKeys)

   const response = {
      statusCode : 200,
      kid : kid,
      appleKeys : appleKeys, 
      json : json,
      payload:payload
  } 
  res.json(response);
})

router.get('/detail/(:id)', async (req, res) => {
  var person = await PersonModel.findById(req.params.id).exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "Detail Person", 
      content : person
  } 
  res.json(response);
})

router.post('/create', async (req, res) => {
  // Do something here
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
  var person = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const response = {
      statusCode : 200,
      error : "",
      message : "Update Person", 
      content : person
  } 
  res.json(response);
})


router.get('/delete/(:id)', async (req, res) => {
  var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
  const response = {
      statusCode : 200,
      error : "",
      message : "Delete  Person", 
      content : person
  } 
  res.json(response);
})
module.exports = router;
