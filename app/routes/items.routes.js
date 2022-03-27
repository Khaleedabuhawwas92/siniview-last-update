module.exports = (app) => {
   const item = require('../controllers/items.controller.js');
   const admin = require('../middleware/admin');
   var router = require('express').Router();

   // Create a new Item
   router.post('/', item.create);

   // Create a new new Prodect
   router.post('/newProdect/:id', item.createNewProdect);

   // Retrieve all Item
   router.get('/', item.findAll);

   // Retrieve all published Item
   router.get('/published', item.findAllPublished);

   // Retrieve a single Item with id
   router.get('/:id', item.findOne);

   // Update a Item with id
   router.put('/:id', item.update);

   // Update The Item to nonPublished TO Published
   router.put('/modifiy/:id', item.published);

   // Delete a Item with id
   router.delete('/:id', item.delete);

   // Delete a Item with id
   router.delete('/deleteProdect/:id', item.deleteProdectByName);

   // Delete a All Item
   router.delete('/', item.deleteAll);

   app.use('/api/items', router);
};
