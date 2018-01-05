const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // app.post('/auth/email', passport.authenticate('local'));
  // app.post('/auth/email', passport.authenticate('local'), function(req, res) {
  //   console.log('working');
  //   res.redirect('/');
  // });

  app.post('/auth/email', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
  });

  app.get('/auth/wechat', passport.authenticate('wechat'));

  app.get(
    '/auth/wechat/callback',
    passport.authenticate('wechat', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
