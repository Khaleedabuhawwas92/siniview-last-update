module.exports = (app) => {
    const expenses = require('../controllers/expenses.controller.js');
    var router = require('express').Router();
 
    // Create a new Item
    router.post('/', expenses.create);
 
    // Retrieve all Item
    router.get('/', expenses.findAll);
 
    // Retrieve all published Item
    router.get('/published/:name', expenses.findAllPublished);
 
    // Retrieve a single Item with id
    router.get('/:id', expenses.findOne);
 
    // Update a Item with id
    router.put('/:id', expenses.update);
 
    // Update The Item to nonPublished TO Published
    router.put('/modifiy/:id', expenses.published);
 
    // Delete a Item with id
    router.delete('/:id', expenses.delete);

    // Delete a All Item
    router.delete('/', expenses.deleteAll);
 
    app.use('/api/expenses', router);
 };
 