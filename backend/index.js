const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/appRoutes");
const port = process.env.PORT;

app.listen(port, () => {
    console.log("App running on : ", port);
});

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

sequelize.authenticate().then(() => {
    console.log("Connected to DB");
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
routes(app);