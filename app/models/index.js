const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.item = require("./items.model.js")(mongoose);
db.calender = require("./calender.model.js")(mongoose);
db.user = require("./users.model.js")(mongoose);
db.reportSale = require("./reportSale.model.js")(mongoose);
module.exports = db;
