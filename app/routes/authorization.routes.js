module.exports = (app) => {
   const auth = require("../controllers/authorization.controller.js");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", auth.findUser);
   router.get("/user", auth.getUser);
   router.get("/logout", auth.logout);

   app.use("/api/authorization", router);
};
