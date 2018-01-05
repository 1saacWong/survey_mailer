const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireAdminLogin = require('../middlewares/requireAdminLogin');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const creditMailer = require('../services/creditMailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const creditSuccessTemplate = require('../services/emailTemplates/creditSuccess');
const creditRejectionTemplate = require('../services/emailTemplates/creditRejection');

const Survey = mongoose.model('surveys');
const User = mongoose.model('users');
const Upload = mongoose.model('uploads');
const Company = mongoose.model('companies');
const Product = mongoose.model('products');
const Price = mongoose.model('prices');
const RejectedUpload = mongoose.model('rejections');
const multer = require('multer');

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// require('../fileUploader')(app);

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({ recipients: false });

    res.send(surveys);
  });
  // app.post('/api/upload', requireLogin, async (req, res) => {
  //   // const upload = await Upload.new({ file });
  // });
  app.get('/api/uploads', requireAdminLogin, async (req, res) => {
    const uploads = await Upload.find({ validated: false }).select({});
    res.send(uploads);
  });

  var uploading = multer({
    dest: '/Users/gabrieljaeger/accelerated/react/shijia/public/uploads'
  });
  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(
        null,
        '/Users/gabrieljaeger/accelerated/react/shijia/public/uploads'
      );
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({
    storage: storage
    // fileFilter: function(req, file, callback) {
    //   var ext = path.extname(file.originalname);
    //   if (
    //     ext !== '.png' &&
    //     ext !== '.jpg' &&
    //     ext !== '.gif' &&
    //     ext !== '.jpeg'
    //   ) {
    //     return callback(res.end('Only images are allowed'), null);
    //   }
    //   callback(null, true);
    // }
  });
  // .single('userFile');
  // upload(req, res, function(err) {
  //   res.end('File is uploaded');
  // });
  app.post(
    '/api/uploads',
    requireLogin,
    upload.single('file'),
    async (req, res) => {
      var { supplier, address, product, quantity, price } = req.body;
      const uploaded = await new Upload({
        supplier,
        address,
        product,
        quantity,
        price,
        image: req.file.originalname,
        _user: req.user.id,
        dateSent: Date.now()
      });
      try {
        await uploaded.save();
        const user = await req.user.save();
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
      // res.send({});
    }
  );
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send({});
  });
  app.get('/api/uploads/:uploadId', async (req, res) => {
    const upload = await Upload.find({
      _id: req.params.uploadId
    });
    res.send(upload);
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.post('/api/entries', requireAdminLogin, async (req, res) => {
    const { supplier, product, price, quantity, user, upload } = req.body;
    const existingCompany = await Company.findOne({ name: supplier });

    if (existingCompany) {
      var existingProduct = await Product.findOne({
        name: product,
        _company: existingCompany._id
      });
      if (existingProduct) {
        var newPrice = await addPrice(existingProduct, price, quantity, upload);
        var updatedUser = await addCredit(user, res);
        return;
      }
      const newProduct = await new Product({
        name: product,
        _upload: upload,
        _company: existingCompany._id
      });
      await newProduct.save();
      await existingCompany.products.push(newProduct);
      await existingCompany.save();

      var newPrice = await addPrice(newProduct, price, quantity, upload);
      var updatedUser = await addCredit(user, upload, res);
      return;
    }
    var newCompany = await new Company({
      name: supplier,
      _upload: upload
    }).save();
    const newProduct = await new Product({
      name: product,
      _upload: upload,
      _company: newCompany._id
    });
    await newProduct.save();
    await newCompany.products.push(newProduct);
    await newCompany.save();
    var newPrice = await addPrice(newProduct, price, quantity, upload);
    var updatedUser = await addCredit(user, upload, res);
  });
  const addCredit = async (user, upload, res) => {
    var userVar = await User.findOne({
      _id: user
    });

    try {
      userVar.credits += 1;
      await userVar.save();
      const uploadVar = await Upload.findOne({
        _id: upload
      });

      uploadVar.creditAwarded = true;
      uploadVar.validated = true;
      await uploadVar.save();
      const creditMailera = await new creditMailer(
        userVar,
        creditSuccessTemplate()
      );
      await creditMailera.send();

      res.send(userVar);
    } catch (err) {
      res.status(422).send(err);
    }
  };
  const addPrice = async (product, totalPrice, quantity, upload) => {
    var pricePerItem = totalPrice / quantity;
    var newPrice = await new Price({
      _upload: upload,
      _product: product,
      totalPrice,
      unitPrice: pricePerItem,
      orderQuantity: quantity
    }).save();
    await product.prices.push(newPrice);
    var totalPrice = 0;
    await _.map(product.prices, price => {
      totalPrice += price.unitPrice;
    });
    product.averagePrice = totalPrice / product.prices.length;
    await product.save();
  };
  app.post('/api/rejections', requireAdminLogin, async (req, res) => {
    const {
      supplier,
      address,
      product,
      price,
      quantity,
      user,
      image,
      upload,
      reasons
    } = req.body;
    const rejectedUpload = await new RejectedUpload({
      supplier,
      address,
      product,
      quantity,
      price,
      image,
      _upload: upload,
      _user: user,
      reasons,
      dateSent: Date.now()
    });

    await rejectedUpload.save();
    const uploadVar = await Upload.findOne({
      _id: upload
    });

    uploadVar.validated = true;
    await uploadVar.save();
    var userVar = await User.findOne({
      _id: user
    });
    try {
      const rejectionCreditMailer = await new creditMailer(
        userVar,
        creditRejectionTemplate(reasons)
      );
      await rejectionCreditMailer.send();
      res.send(userVar);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
