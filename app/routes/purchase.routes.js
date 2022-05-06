module.exports = (app) => {
   const purchase = require('../controllers/purchase.contrroller');
   var router = require('express').Router();

   // Create a new purchase
   router.post('/', purchase.create);

   // faind all  purchase
   router.get('/', purchase.findAll);

   // faind all  purchase published
   router.get('/published/:name', purchase.findAllPublished);

   // faind all  purchase
   router.get('/undisplaypublished/:id', purchase.published);


   // Retrieve a single purchase with id
   router.get('/:id', purchase.findOne);

   // Delete a All purchase
   router.delete('/', purchase.deleteAll);

   app.use('/api/purchase', router);
};
