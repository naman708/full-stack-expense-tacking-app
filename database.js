
const { Sequelize } = require('sequelize');
const sequelize=new Sequelize('node_com','root','Naman@11',{dialect:'mysql',host:'localhost'});
module.exports=sequelize;
