const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

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
  const newProduct = new Product({name: req.body.name, price: req.body.price, category: req.body.category});
  await newProduct.save();
  res.redirect('/');
})

// Product Details Route:
app.get('/products/:id', async (req, res)=>{
  const {id} = req.params;
  const product =  await Product.findById(id);
  res.render('products/show',{product});
})

// Update Product Route: 
app.get('/products/:id/edit', async (req, res)=>{
  const {id} = req.params;
  const product =  await Product.findById(id);
  res.render('products/edit',{product});
})

app.put('/products/:id', async(req, res)=>{
   const {id} = req.params;
   const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true});
   res.redirect(`/products/${product.id}`);
})

// Delete Route:
app.delete('/products/:id', async(req, res)=>{
   const {id} = req.params;
   const deletedProduct = await Product.findByIdAndDelete(id);
   console.log(`${deletedProduct}, has been removed`);
   res.redirect('/')
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
