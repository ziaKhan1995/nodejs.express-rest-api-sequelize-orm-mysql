# About this Project:
A basic NodeJS Container application which consist of Express server environment, REST API , Sequelize ORM, and of course MySQL Database connection. The project is more organized in terms of separate folders for Models, Controllers, Routers, DB Configurations, Auto creating Database and tables according to the structure specified in models. 
## NodeJS Container application framwowrk
![image](https://user-images.githubusercontent.com/77499979/229306201-ed21c710-f1b6-4ec2-bb57-a9e2090ee4e4.png)


## Steps to create a complete project of  NodeJS Express-Server-RESTAPI Sequelize-ORM MySQL-connection

**Note**: After creating the project, the structure should look like this:
![image](https://user-images.githubusercontent.com/77499979/229306148-091f9b89-ad18-4597-91b7-980069bdcbf9.png)


Steps:
1. Create Node.js App

create a directory using command
````diff
  mkdir nodejs-expressjs-restapi-sequelizorm-mysql-db
  ````

2. navigate to the directory using command
````diff
  cd nodejs-expressjs-restapi-sequelizorm-mysql-db
````
3. open the directory in CMD Line Interface(if not opened in CMD) and run 
	````diff
	npm init
````

Answer the questions like these:

```diff
name: (nodejs-express-sequelize-mysql) 
version: (1.0.0) 
description: Node.js Rest Apis with Express, Sequelize & MySQL.
entry point: (index.js) app.js //chose any file like server.js
test command: 
git repository: 
keywords: nodejs, express, sequelize, mysql, rest, api
author: zia Khan
license: (ISC)

Is this ok? (yes) yes
````

#### Check package.json created.

Open the project in VS code using command:	
````diff
code . 
````
4. Install necessary modules: express, sequelize, mysql2 and cors.
Run the command:
````diff
	npm install express sequelize mysql2 cors --save
````
Check package.json updated.

**express** is a popular Node.js framework for building web applications and APIs.

**sequelize** is a powerful Object-Relational Mapping (ORM) tool for working with databases.

**mysql2** is a MySQL database driver for Node.js.

**body-parser** is a middleware that parses incoming request bodies in a middleware before your handlers, available under the req.body property.

**cors** is a middleware that can be used to enable Cross-Origin Resource Sharing (CORS).

5. Setup Express web server
In the root folder, let’s create a new app.js file and paste this code:

````diff

const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8090"
}
app.use(cors(corsOptions));

//parse request of content-type - - application/json
app.use(express.json());

//parse request of content-type - - application/ww-form-url-encoded
app.use(express.urlencoded({ extended: true }));

//default app port calling response
app.get("/", (req, res) => {
    res.json({ message: "Welcome To our Node JS Express Js using Rest API with Sequelze ORM and MySQL DB Connection" });
});


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log("\nYou NodeJS Express Server App is running on the PORT " + PORT + "\n");
});

// set port, listen for requests
require("./app/routes/routes")(app);
//build/establish db conection by calling index.js file
var db = require("./app/models");

//let the nodejs create tables according to the models. 
//comment this if you do not want to make tables empty on reRunning the APP in CMD.
//This code on runnig the app will create tabees from models and delete all data if exist.
//if you comment this line, you have to create tables in database.
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Db synced");
// }).catch(() => {
//     console.log("Fail to synce DB");
// });



````diff

This sets up a basic Express server with middleware to parse JSON and urlencoded data, and enable CORS.
It also defines a simple / route that sends a "Hello, world!" message.

TEST using localhost:8090/ in postman or web.

6. Configure MySQL database & Sequelize
In the app folder, we create a separate config folder for configuration with db.config.js file like this:
````diff
module.exports = {
  HOST: "localhost",
  USER: "username",
  PASSWORD: "password",
  DB: "database_name",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
````
#### Note: 
Replace database_name, username, and password with the appropriate values for your MySQL database.
This creates a new Sequelize instance and connects to your MySQL database using the mysql2 driver.

7. Initialize Sequelize
We’re gonna initialize Sequelize in app/models folder that will contain model in the next step.

Now create app/models/index.js with the following code:

````diff
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
///.... more models if any
module.exports=db;

````

8. Define the Sequelize Model
create models folder, create product.model.js and customer.model.js files. Code provided


 9. Create the Controller
Inside app folder, let’s create controller folder.
create product.controller.js and customer.controller.js files. Code provided

10. create routes folder then routes/routes.js like this:

```diff
module.exports=app =>{
const CustomerControll=require("../controllers/customer.controller.js");
const ProductControll=require("../controllers/product.controller.js");
const router=require("express").Router();

//customers
router.post("/save/customer",CustomerControll.create);
router.get("/get/customer",CustomerControll.findAll);

//Products
router.post("/save/product",ProductControll.create);
router.get("/get/products",ProductControll.findAll);


app.use("/v1",router)
};

````

11.Test the APIs
Run our Node.js application with command: node app.js.


Note: In the whole process we did not mentioned creating database, tables and defining their columns
because the code in app.js create tables if does not exist.




