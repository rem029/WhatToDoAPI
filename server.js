const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static("public"));

//APIs
//Users
const users = require("./api/users");
app.use("/api/users", users);
//APIs
//Task Lists
const tasklists = require("./api/taskLists");
app.use("/api/tasklists", tasklists);

app.get("/", (req, res) => {
	res.sendStatus(404);
});

app.listen(3000, () => {
	console.log("Server started at port " + 3000);
});
