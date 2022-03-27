const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get('/', (req, res) => {
   res.json({ message: 'Welcome to Khaled application.' });
});

const db = require('./app/models');

db.mongoose
   .connect(db.url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify:false,
      // tls: true,
      // tlsCAFile: './ca-certificate.crt',
   })
   .then(() => {
      console.log('Connected to the database!');
   })
   .catch((err) => {
      console.log(err);
      process.exit();
   });

require('./app/routes/items.routes')(app);
require('./app/routes/calender.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/authorization.routes')(app);
require('./app/routes/reportItems.routes')(app);
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   next();
});

app.all('*', (req, res, next) => {
   res.status(404).json({
      status: 'false',
      message: 'Page is Not FOUND',
   });
});

// set port, listen for request
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});
