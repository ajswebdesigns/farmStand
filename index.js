const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStandDB')
.then(()=>{
  console.log('Mongo Connection Open')
})
.catch((err)=>{
  console.log('OH No Mongo ERROR')
  console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
  res.send('Thank you for visiting our website')
})

app.listen(port, ()=>{
  console.log(`App is listening on ${port}`);
})

