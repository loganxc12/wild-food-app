const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const connectPg = require("connect-pg-simple");
const authController = require("./controllers/authController");
const controller = require("./controllers/controller");
require("dotenv").config();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
     app.set("db", dbInstance);
     console.log("connected to db")
}).catch(error => console.log("error in massive connection", error));

const app = express();
app.use(bodyParser.json());
app.use(session({
     secret: process.env.SESSION_SECRET,
     saveUninitialized: false,
     resave: false,
}));

//Auth0 Login/Sign up functionality
app.get("/auth/callback", authController.login); 
//Retrieves user from session
app.get("/auth/user-data", authController.getUser); 
//Kills session
app.post("/auth/logout", authController.logout);
//Get adventures from database
app.get("/api/adventures", controller.readAdventures);
//Post new adventure
app.post("/api/adventures", controller.postAdventure);
//Get species from database
app.get("/api/species", controller.readSpecies);
//Post new species
app.post("/api/species", controller.postSpecies);


const PORT = 4000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));