const db = require('../models');
const serves = require('../services/serversUser');
const User = db.user;

// Create and Save a new daet
exports.create = (req, res) => {
   // Validate request

   // Create a daet
   const user = new User({
      name: req.body.name ? req.body.name : 'khaleed',
      age: req.body.age ? req.body.age : '35',
      email: req.body.email,
      password: serves.Encryption(req.body.password),
      isAdmain: req.body.isAdmain ? req.body.isAdmain : false,
      published: req.body.published ? req.body.published : true,
      roles: [
         {
            insert: req.body.insert ? req.body.insert : false,
            delete: req.body.delete ? req.body.delete : false,
            read: req.body.read ? req.body.read : false,
            write: req.body.write ? req.body.write : false,
         },
      ],
   });
   const token = user.token();
   user.auth = token;
   // Save users in the database
   user
      .save(user)
      .then((data) => {
         res.header('Authorization', token).send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while creating the user',
         });
      });
};

// Retrieve all calenders from the database.
exports.findAll = async (req, res) => {
   const name = req.query.name;
   var condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};
   await User.find(condition)
      .then((data) => {
         res.send(data);
         console.log(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               'Some error occurred while retrieving user.......',
         });
      });
};

// Find a single calenders with an id
exports.findOne = async (req, res) => {
   const id = req.params.id;

   await User.findById(id)
      .then((data) => {
         if (!data)
            res.status(404).send({
               message: 'Not found user with id ' + id,
            });
         else res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error retrieving user with id=' + id,
         });
      });
};

// Update a calenders by the id in the request
exports.update = async (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: 'Data to update can not be empty!',
      });
   }

   const id = req.params.id;
   await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update calender with id=${id}. Maybe User was not found!`,
            });
         } else res.send({ message: 'User was updated successfully.' });
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating User with id=' + id,
         });
      });
};

// Delete a calenders with the specified id in the request
exports.delete = async (req, res) => {
   const id = req.params.id;
   if (!req.body.name) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
   }

   await User.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete User with id=${id}. Maybe calender was not found!`,
            });
         } else {
            res.send({
               message: 'User was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete User with id=' + id,
         });
      });
};

// UNDisplay for list without Delete
exports.published = async (req, res) => {
   const id = req.params.id;

   await User.findByIdAndUpdate(
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
               message: `Cannot update user with id=${id}. Maybe user was not found!`,
            });
         } else {
            res.send({ message: 'user was updated successfully.' });
            console.log(`user was unDisplay successfully. ${id}`);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error updating user with id=' + id,
         });
      });
};

// Display for list
exports.recovery = async (req, res) => {
   const id = req.params.id;

   await User.findByIdAndUpdate(
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
            message: 'Error updating calender with id=' + id,
         });
      });
};

// Delete all calenders from the database.
exports.deleteAll = async (req, res) => {
   await User.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} User were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while removing all User.',
         });
      });
};

// Find all published calenders
exports.findAllPublished = async (req, res) => {
   var selectedData = {
      __v: false,
      _id: false,
      published: false,
   };
   await User.find({ published: true }, selectedData)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving calenders.',
         });
      });
};
exports.findAllunPublished = async (req, res) => {
   await User.find({ published: false })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while retrieving calenders.',
         });
      });
};
