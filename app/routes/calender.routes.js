module.exports = (app) => {
    const calender = require("../controllers/calender.controller.js");
 
    var router = require("express").Router();
 
    // Create a new Tutorial
    router.post("/", calender.create);
 
    // Retrieve all Tutorials
    router.get("/", calender.findAll);
 
    // Retrieve all published Tutorials
    router.get("/published", calender.findAllPublished);
 
    // Retrieve all published Tutorials
    router.get("/unpublished", calender.findAllunPublished);
 
    // Retrieve a single Tutorial with id
    router.get("/:id", calender.findOne);
 
    // Update a Tutorial with id
    router.put("/:id", calender.update);
 
    // update Without Delete
    router.put("/modifiy/:id", calender.published);
 
    // update Without Delete
    router.put("/recovery/:id", calender.recovery);
 
    // Delete a Tutorial with id
    router.delete("/:id", calender.delete);
 
    // Create a new Tutorial
    router.delete("/", calender.deleteAll);
 
    app.use("/api/calender", router);
 };
 