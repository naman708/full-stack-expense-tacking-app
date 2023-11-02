
const { Sequelize } = require('sequelize');
const sequelize=new Sequelize(process.env.DB,'root',process.env.DBPASS,{dialect:'mysql',host:'localhost'});
module.exports=sequelize;
