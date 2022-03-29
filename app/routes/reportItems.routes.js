module.exports = (app) => {
   const reportItems = require('../controllers/reportItems.controller');
   var router = require('express').Router();

   // Create a new reportItems
   router.post('/', reportItems.create);

 

   // find all  reportItems
   router.get('/', reportItems.findAll);

   // find all  reportItems published
   router.get('/unDisplayPublished/:id', reportItems.published);
   // find all  reportItems published
   router.get('/findPublished', reportItems.findAllPublished);

   // Retrieve a single reportItems with id
   router.get('/:id', reportItems.findOne);


   

   app.use('/api/reportItems', router);
};
