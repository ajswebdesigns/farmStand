const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const Product = require('./models/product');
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

app.get('/', async (req, res)=>{
  const products =  await Product.find({})
  console.log(products)
  res.send('All Products Will be here!')
})

app.listen(port, ()=>{
  console.log(`App is listening on ${port}`);
})



// old way of doing things async is better
// app.get('/', (req, res)=>{
//   const products = Product.find({})
//   .then((res)=>{
//     console.log(res)
//   })
//   res.send('All Products Will be here!')
// })
