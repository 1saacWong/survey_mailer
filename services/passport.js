const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const WechatStrategy = require('passport-wechat').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const LocalStrategy = require('passport-local');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, email, done) => {
      console.log(accessToken);
      const existingUser = await User.findOne({ googleId: email.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: email.id,
        username: email.emails[0].value
      }).save();
      done(null, user);
    }
  )
);
// passport.use(new GoogleStrategy({
//     appId: WECHAT_APP_ID,
//     appSecret: WECHAT_APP_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/wechat/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ openid: profile.openid }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
// passport.use(new WechatStrategy({
//         appID: {APPID},
//         name:{默认为wechat,可以设置组件的名字}
//         appSecret: {APPSECRET},
//         client:{wechat|web},
//         callbackURL: {CALLBACKURL},
//         scope: {snsapi_userinfo|snsapi_base},
//         state:{STATE},
//         getToken: {getToken},
//         saveToken: {saveToken}
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         return done(err,profile);
//       }
// ));

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    async (req, username, password, done) => {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        username: username,
        password: password
      }).save();
      done(null, user);
    }
  )
);

// passport.use(
//   new LocalStrategy(async (login, password, done) => {
//     console.log('helloJDFSJLDSFJKLFDSljk');
//     const existingUser = await User.findOne({ email: email });
//     if (existingUser) {
//       return done(null, existingUser);
//     }
//     const user = await new User({ email: email, password: password }).save();
//     done(null, user);
//   })
// );
