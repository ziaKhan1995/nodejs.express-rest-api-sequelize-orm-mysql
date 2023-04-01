Steps to create a complete project of  NodeJS Express-Server-RESTAPI Sequelize-ORM MySQL-connection

After crating the project, the structure should look like this:
https://d2mk45aasx86xg.cloudfront.net/Mechanism_of_Sequelize_js_3_11zon_653867cd15.webp

Steps:
1. Create Node.js App

create a directory using command
  mkdir nodejs-express-sequelize-mysql

2. navigate to the directory using command
  cd nodejs-express-sequelize-mysql

2. open the directory in CMD Line Interface(if not opened in CMD) and run 
	npm init

Answer the questions like these:

name: (nodejs-express-sequelize-mysql) 
version: (1.0.0) 
description: Node.js Rest Apis with Express, Sequelize & MySQL.
entry point: (index.js) server.js //chose any file like app.js
test command: 
git repository: 
keywords: nodejs, express, sequelize, mysql, rest, api
author: bezkoder
license: (ISC)

Is this ok? (yes) yes

Check package.json created.

Open in VS code using command:	code . 

4. Install necessary modules: express, sequelize, mysql2 and cors.
Run the command:

	npm install express sequelize mysql2 cors --save

Check package.json updated.

5. Setup Express web server
In the root folder, let’s create a new server.js file and paste this code:

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Our Node JS application By Zia Khan." });
});

// set port, listen for requests
require("./app/routes/turorial.routes")(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");
db.sequelize.sync({force:true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  /*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
  */


TEST using localhost:8080/ in postman or web.

6. Configure MySQL database & Sequelize
In the app folder, we create a separate config folder for configuration with db.config.js file like this:
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


7. Initialize Sequelize
We’re gonna initialize Sequelize in app/models folder that will contain model in the next step.

Now create app/models/index.js with the following code:

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;


8. Define the Sequelize Model
In models folder, create tutorial.model.js file like this:
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };

  9. Create the Controller
Inside app/controllers folder, let’s create tutorial.controller.js with these CRUD functions:

const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    console.log('req:',req.body);
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

//Retrieve all Tutorials/ find by title from the database:

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


//Retrieve a single object
//Find a single Tutorial with an id:

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

//Update Object
exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  }

  //Delete an object
//Delete a Tutorial with the specified id:

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
// all objects
//Delete all Tutorials from the database:

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
//Find all objects by condition
//Find all Tutorials with published = true:

exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// This controller can be modified a little to return pagination response:

// {
//     "totalItems": 8,
//     "tutorials": [...],
//     "totalPages": 3,
//     "currentPage": 1
// }


10. Define Routes
When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse by setting up the routes.

These are our routes:

/api/tutorials: GET, POST, DELETE
/api/tutorials/:id: GET, PUT, DELETE
/api/tutorials/published: GET
Create a turorial.routes.js inside app/routes folder with content like this:

module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  
    app.use('/v1/tutorials', router);
  };




11.Test the APIs
Run our Node.js application with command: node server.js.

Using Postman, we're gonna test all the Apis above.

1. Create a new Tutorial using POST /tutorials API
  http://localhost:8081/v1/tutorials

2. Retrieve all Tutorials using GET /tutorials API
  http://localhost:8081/v1/tutorials/

3. Retrieve a single Tutorial by id using GET /tutorials/:id Api
  http://localhost:8081/v1/tutorials/7

4. Update a Tutorial using PUT /tutorials/:id Api
  http://localhost:8081/v1/tutorials/7

and so, on

Note: In the whole process we did not mentioned creating database, tables and defining their columns
because the code in serer.js create tables if does not exist.

Links:
https://www.bezkoder.com/node-js-express-sequelize-mysql/
https://d2mk45aasx86xg.cloudfront.net/Mechanism_of_Sequelize_js_3_11zon_653867cd15.webp


