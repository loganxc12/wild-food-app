const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const controller = require("./controller");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
     app.set("db", dbInstance);
     console.log("connected to db")
}).catch(error => console.log("error in massive connection", error));

const PORT = 4000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));