const Expense=require('../models/expense');
const Razorpay = require('razorpay');
const Order = require('../models/orders')
const SIGNIN=require('../models/signin');
const usercontrol=require('./expensesignin');
const sequelize = require('../util/database');



exports.addexpense= async(req,res)=>{
    
    try{
        const{Price,Description,Category}=req.body;
        const data1=await Expense.create({
        Price:Price,
        Description:Description,
        Category:Category,
        userDetailId:req.user.id,
      

       });
       const totalexpense=Number(req.user.totalExpense)+Number(Price)
       await SIGNIN.update(
        { totalExpense: totalexpense },
        { where: { id: req.user.id } }
        
    );
       console.log(`total expense>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${totalexpense}`);
        
        
       res.status(201).json({added:data1});


    }
    catch(err){
        console.log(err);
      res.status(500).send('An error occurred while saving appointments.');
    }


};
exports.showallexpenses= async(req,res)=>{
    try{
        const UID=req.user.id;
       // console.log(`uid>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${UID}`);
        //const finddata=await Expense.findAll({where:{userDetailId:UID}});
        //const finddata1=await SIGNIN.findAll({where:{id:UID}});
        //console.log(finddata);
        
      // res.status(201).json({Alluserdata:finddata});
       const page = req.params.id || 1; // Get the page number from the request
       const itemperpage=req.query.itemperpage;;
       const itemsPerPage = Number(itemperpage); 
       console.log(`item>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${itemperpage}`);// Define the number of items per page
       const offset = (page - 1) * itemsPerPage;

       const expenses = await Expense.findAndCountAll({
        limit: itemsPerPage,
        offset: offset,
        where: {
         userDetailId: req.user.id,
         },
     });
     const totalItems = expenses.count;
     const totalPages = Math.ceil(totalItems / itemsPerPage);
     const nextpage=Number(page)+1;
     
     res.status(200).json({
       expenses: expenses.rows,
       currentpage: page,
       hasnextpage:itemsPerPage*page<totalItems,
       nextpage:nextpage,
       haspreviouspage:page>1,
       previouspage:page-1,
       lastpage: totalPages,
       itemsPerPage: itemsPerPage,
       totalItems: totalItems,
     });
     



    }
    catch(err){
        console.log(err);
      res.status(500).send('An error occurred while saving appointments.');
    }


};
exports.delexpense=async(req,res)=>{
    try{
        const UID=req.params.id;
        const pricedel=req.params.id1;
        console.log(`uid>>>>>>>>>>>>>>>>>>>${UID}`);

        console.log(`pricedel>>>>>>>>>>>>>>>>>>>${pricedel}`);
        console.log(`total expense>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${req.user.totalExpense}`);

       await Expense.destroy({where:{id:UID}});
       

        const totalexpense=Number(req.user.totalExpense)-Number(pricedel)
        await SIGNIN.update(
            { totalExpense: totalexpense },
            { where: { id: req.user.id } }

        );

        res.sendStatus(200);



    }
    catch(err){
        console.log(err);
      res.status(500).send('An error occurred while saving appointments.');
    }

};
