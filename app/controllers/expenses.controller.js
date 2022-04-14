const db = require('../models');
const Expenses = db.expenses;

// Create and Save a new daet
exports.create = (req, res) => {
   // Validate request
   if (!req.body.description) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
   }

   // Create a daet
   const expenses = new Expenses({
      description: req.body.description,
      value: req.body.value,
 
      published: req.body.published,
      casherName: req.body.casherName,
   });

   // Save description in the database
   expenses
      .save(expenses)
      .then((data) => {
         res.send(data);
         console.log('Created A new purchases');
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               'Some error occurred while creating the purchases',
         });
      });
};

// Retrieve all calenders from the database.
exports.findAll = (req, res) => {
   Expenses.find()
      .then((data) => {
         res.send(data);
         console.log(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               'Some error occurred while retrieving Purchases.......',
         });
      });
};

// Find a single calenders with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   Expenses.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: 'Not found locatin with id ' + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error retrieving calender with id=' + id,
         });
      });
};

// Update a Purchases by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: 'Data to update can not be empty!',
      });
   }
   const id = req.params.id;
   Expenses.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Purchases with id=${id}. Maybe calender was not found!`,
            });
         } else res.send({ message: 'Purchases was updated successfully.' });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating Purchases with id=' + id,
         });
      });
};

// Delete a Purchases with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   if (!req.body.title) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
   }

   Expenses.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete calender with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({
               message: 'Purchases was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete Purchases with id=' + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;
   Expenses.findByIdAndUpdate(
      id,
      {
         $set: {
            published: false,
            updatedAt: new Date(),
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Purchases with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({ message: 'Purchases was updated successfully.' });
            console.log(`Purchases was unDisplay successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating Purchases with id=' + id,
         });
      });
};

// Display for list
exports.recovery = (req, res) => {
   const id = req.params.id;
   Expenses.findByIdAndUpdate(
      id,
      {
         $set: {
            published: true,
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update calender with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({ message: 'calender was updated successfully.' });
            console.log(`calender was Recovery successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating Purchases with id=' + id,
         });
      });
};

// Delete all calenders from the database.
exports.deleteAll = (req, res) => {
   Expenses.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Purchases were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               'Some error occurred while removing all Purchases.',
         });
      });
};

// Find all published Purchases
exports.findAllPublished = (req, res) => {
   Expenses.find({ published: true })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving Purchases.',
         });
      });
};
exports.findAllunPublished = (req, res) => {
   Expenses.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving Purchases.',
         });
      });
};
