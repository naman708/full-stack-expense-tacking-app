// controllers/productController.js
const Product = require('../models/Product');
const path = require('path');
const fs=require('fs');
const rootDir=require('../util/path');

exports.getAddProduct = (req, res) => {
  res.sendFile(path.join(rootDir,'view','form.html'));

};

exports.postAddProduct = async(req, res) => {
  try{
    const { name, description } = req.body;

   const data=await Product.create({
    name:name,
    description:description,
  })
       
      res.status(201).json({newuserdetails:data});
      
  }catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while saving appointments.');
  }
   
};

exports.getProducts = async (req, res) => {
  try {
    const appointments = await Product.findAll();
   res.status(200).json({alluser:appointments});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching appointments.');
  }
};

exports.delproduct=async(req,res)=>{
  try{
    const uId=req.params.id;
    await Product.destroy({where:{id:uId}});
    res.sendStatus(200);
  }catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting appointments.');
  }
};