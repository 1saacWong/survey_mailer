const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const multer = require('multer');
require('./models/User');
require('./models/Survey');
require('./models/Upload');
require('./models/Company');
require('./models/Product');
require('./models/Price');
require('./models/RejectedUpload');
//order important here. otherwise userSchema is not loaded
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/companyRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/priceRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //epxress will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('client/build'));
  //express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
