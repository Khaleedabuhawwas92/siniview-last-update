module.exports = (app) => {
   const user = require("../controllers/users.controller.js");

   var router = require("express").Router();

   // Create a new Tutorial
   router.post("/", user.create);

   // Retrieve all Tutorials
   router.get("/", user.findAll);

   // Retrieve all published Tutorials
   router.get("/published", user.findAllPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", user.findOne);

   // Update a Tutorial with id
   router.put("/:id", user.update);

   // ub
   router.put("/modifiy/:id", user.published);

   // update Without Delete
   router.put("/recovery/:id", user.recovery);

   // Delete a Tutorial with id
   router.delete("/:id", user.delete);

   // Create a new Tutorial
   router.delete("/", user.deleteAll);

   app.use("/api/user", router);
};
