const mongoose = require('mongoose');
const Product = mongoose.model('products');
const creditMailer = require('../services/creditMailer');
const priceInfoTemplate = require('../services/emailTemplates/priceInfoTemplate');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
  app.get(
    '/api/prices/:product',
    requireLogin,
    requireCredits,
    async (req, res) => {
      const productVar = await Product.find({ _id: req.params.product });
      console.log(productVar);
      const priceInfoMailer = await new creditMailer(
        req.user,
        priceInfoTemplate(productVar[0])
      );

      await priceInfoMailer.send();
      try {
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send({ product: productVar, user });
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.get('/api/products/search/:searchQuery', async (req, res) => {
    const products = await Product.find({ name: req.params.searchQuery });
    // console.log(req.params.searchQuery);
    res.send(products);
  });
};
