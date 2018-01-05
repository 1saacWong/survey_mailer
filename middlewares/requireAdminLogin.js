module.exports = (req, res, next) => {
  if (!req.user.admin) {
    return res.status(401).send({ error: 'You must log in' });
  }

  next();
};
