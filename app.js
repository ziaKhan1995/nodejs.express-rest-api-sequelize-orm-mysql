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

