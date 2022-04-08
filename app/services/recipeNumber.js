const db = require('../models');
const ReportSale = db.reportSale;
module.exports = function (req, res, next) {
   ReportSale.find()
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
