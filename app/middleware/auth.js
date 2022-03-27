const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
   const token = req.header('Authorization');
   if (!token) {
      res.send('rejected ......');
   }
   try {
      const decoded = jwt.verify(token, 'privet');
      const decoded2 = jwt.decode(token, decoded);
      req.user = decoded;

      console.log(decoded);
      console.log(decoded2);

      next();
   } catch (error) {
      res.status(400).send('worng token .....');
   }
};
