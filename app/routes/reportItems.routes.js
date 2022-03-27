module.exports = (app) => {
   const reportItems = require('../controllers/reportItems.controller');
   var router = require('express').Router();

   // Create a new reportItems
   router.post('/', reportItems.create);

   // faind all  reportItems
   router.get('/', reportItems.findAll);

   // faind all  reportItems
   router.get('/published', reportItems.published);

   // Retrieve a single reportItems with id
   router.get('/:id', reportItems.findOne);

   app.use('/api/reportItems', router);
};
