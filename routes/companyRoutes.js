const mongoose = require('mongoose');
const Company = mongoose.model('companies');

module.exports = app => {
  app.get('/api/companies', async (req, res) => {
    const companies = await Company.find({});
    res.send(companies);
    // res.send({});
  });

  app.get('/api/companies/:companyId', async (req, res) => {
    const company = await Company.find({
      _id: req.params.companyId
    });
    res.send(company);
  });

  app.get('/api/companies/search/:searchQuery', async (req, res) => {
    const companies = await Company.find({ name: req.params.searchQuery });
    // console.log(req.params.searchQuery);
    res.send(companies);
  });
};
