
// app.js
const path = require('path'); 
const express = require('express');
const cors = require('cors');

// Use CORS middleware

const Expense=require('./models/expense');
const SIGNIN=require('./models/signin');
const Order = require('./models/orders');
const Forgotpass = require('./models/forgotpassword');

const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const signinroute = require('./routes/signinroute');
const addordelExpense = require('./routes/addordelexpense');
const purchase= require('./routes/purchase');
const PremiumFeat= require('./routes/premiumfeature');
const ResetPassword= require('./routes/resetpassword');
const downloaduserreport= require('./routes/Downloadreport');

const rootDir=require('./util/path');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(signinroute);
app.use(addordelExpense);
app.use(purchase);
app.use(PremiumFeat);
app.use(ResetPassword);
app.use(downloaduserreport);
SIGNIN.hasMany(Expense);
Expense.belongsTo(SIGNIN);
SIGNIN.hasMany(Order);
Order.belongsTo(SIGNIN);
SIGNIN.hasMany(Forgotpass);
Forgotpass.belongsTo(SIGNIN);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


 


