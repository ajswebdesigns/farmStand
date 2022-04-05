const express = require('express');
const app = express();
const path = require('path');
const port = 3000

app.set('views', paht.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.listen(port, ()=>{
  console.log(`App is listening on ${port}`);
})
