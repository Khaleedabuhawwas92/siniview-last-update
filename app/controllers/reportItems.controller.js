const db = require('../models');

const ReportSale = db.reportSale;

// Create and Save a new Tutorial
exports.create = (req, res) => {
   // Validate request

   // Create a Tutorial
  
   const reportSale = new ReportSale({
      casherName: req.body.casherName,
      published: req.body.published ? req.body.published : true,
      image: req.body.image
         ? req.body.image
         : 'https://picsum.photos/1920/1080?random',
      additions: req.body.additions ? req.body.additions : ['null'],
      sumation: req.body.sumation,
      discraption: req.body.discraption ? req.body.discraption : 'true',
  
   
   });

   // Save Items in the database
   reportSale
      .save(reportSale)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while creating the Item.',
         });
      });
};
// exports.createNewProdect = (req, res) => {
//    const id = req.params.id;
//    let co = ['halooo', 'good job', 'am redy'];
//    // Create a reportSale
//    const product = new Object({
//       allIetms: req.body.allIetms ? req.body.allIetms : co,
//       additions: req.body.additions ? req.body.additions : [],
//       sumation: req.body.sumation ? req.body.sumation : 27,
//       casherName: req.body.casherName ? req.body.casherName : 'khaled',
//       discraption: req.body.discraption ? req.body.discraption : 'true',
//       price: req.body.price ? req.body.price : 22,
//       created: new Date(),
//    });
//    // Save Item in the database
//    ReportSale.findOneAndUpdate({ _id: id }, { $push: { product: product } })
//       .then((data) => {
//          res.send({ massege: 'prodect has been added successfully' }, product);
//       })
//       .catch((err) => {
//          res.status(500).send({
//             message:
//                err.message || 'Some error occurred while creating the Item.',
//          });
//       });
// };

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
   const tab = req.query.allIetms;
   var condition = tab
      ? { tab: { $regex: new RegExp(tab), $options: 'i' } }
      : {};

   ReportSale.find(condition)
      .then((data) => {
         res.send(data);
         console.log(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving Items.',
         });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
   const id = req.params.id;

   ReportSale.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: 'Not found Item with id ' + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error retrieving Item with id=' + id,
         });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: 'Data to update can not be empty!',
      });
   }

   const id = req.params.id;

   ReportSale.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update item with id=${id}. Maybe item was not found!`,
            });
         } else res.send({ message: 'Item was updated successfully.' });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating item with id=' + id,
         });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;

   ReportSale.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete item with id=${id}. Maybe item was not found!`,
            });
         } else {
            res.send({
               message: 'Item was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete Item with id=' + id,
         });
      });
};

// Delete One prodect by tab-name (body) and id prodect in (parms)
exports.deleteProdectByName = (req, res) => {
   const tabName = req.body.tab;

   // update Item in the database
   ReportSale.findOneAndUpdate(
      { tab: tabName },
      { $pull: { product: { _id: req.params.id } } }
   )
      .then((data) => {
         res.send({ message: 'Item was Deleted prodect is successfully.' });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while creating the Item.',
         });
      });
};

// UNDisplay for list without Delete
exports.published = (req, res) => {
   const id = req.params.id;

   ReportSale.findByIdAndUpdate(
      id,
      {
         $set: {
            published: false,
         },
      },
      { useFindAndModify: false }
   )
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update Item with id=${id}. Maybe Tutorial was not found!`,
            });
         } else res.send({ message: 'Item was updated successfully.' });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating Item with id=' + id,
         });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
   ReportSale.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Item were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while removing all Item.',
         });
      });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
   ReportSale.find({ published: true })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving items.',
         });
      });
};
