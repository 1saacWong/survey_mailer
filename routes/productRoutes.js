const mongoose = require('mongoose');
const Product = mongoose.model('products');

module.exports = app => {
  app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  });

  app.get('/api/products/search/:searchQuery', async (req, res) => {
    const products = await Product.find({ name: req.params.searchQuery });
    // console.log(req.params.searchQuery);
    res.send(products);
  });
};
