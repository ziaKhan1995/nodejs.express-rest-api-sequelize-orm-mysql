const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    HOST: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAlliases: true,

    pool: {
        min:dbConfig.min,
        max:dbConfig.max,
        acquire:dbConfig.acquirem,
        idle:dbConfig.idle
    }
}
);

const db={};

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.editors=require("../models/customer.model.js")(sequelize,Sequelize);
db.products=require("../models/product.model.js")(sequelize,Sequelize);

module.exports=db;


