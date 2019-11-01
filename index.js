require('dotenv').config()
const express = require('express') 
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require("body-parser");
const TYPE = process.env.TYPE || 'PROD'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

// URL apa lalu ditangani oleh aksi apa. Aksi yang kita lewatkan ke dalam routes harus menerima variabel request, response

var profileRoute = require('./routes/profileRoute');
var todoRoute = require('./routes/todoRoute');
app.use('/profile', profileRoute);
app.use('/todo', todoRoute);

app.get('/ganjilgenap', function(req, res, next) {
    angka = [1,2,3,4,5,6,7,8,9]
     huruf = []
    for (let index = 0; index < angka.length; index++) {
        if(angka[index]% 2 == 0){
            huruf[index] ='genap'
           }else{
             huruf[index] ='ganjil'
 
        } 
    }
    const response = {
      angka : angka, 
     huruf : huruf 
 } 
 res.json(response);
 });
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!  ${TYPE}`))