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
// Allows us to parse the body
app.use(express.urlencoded({extended:true}))

// All Products Route:
app.get('/', async (req, res)=>{
  const products =  await Product.find({});
  res.render('products/index',{ products });
})

// Create Product Route:
app.get('/products/new',(req,res)=>{
  res.render('products/new');
})

// Post Route For New Product:
app.post('/products',async (req, res)=>{
  const newProduct = new Product({name: req.body.name, price: req.body.price, category: req.body.category})
  await newProduct.save()
  res.redirect('/')
})

// Product Details Route:
app.get('/products/:id', async (req, res)=>{
  const {id} = req.params;
  const product =  await Product.findById(id);
  console.log(product);
  res.render('products/show',{product});
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
