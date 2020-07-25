const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBExtURL = process.env.MONGOURL;

mongoose.connect(mongoDBExtURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(()=>console.log("Successfully connected to Database."))
.catch(err => {console.log(err)});
