
// app.js
const path = require('path'); 
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Use CORS middleware


const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const productRoutes = require('./routes/productRoutes');
const rootDir=require('./util/path');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(productRoutes);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


 


