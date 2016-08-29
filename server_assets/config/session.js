; (function () {

  var session = require('express-session')
    , NedbStore = require('connect-nedb-session')(session);

  // Use with the session middleware (replace express with connect if you use Connect) 
  var Session = session({
    secret: process.env.SESSIONSECRET || 'I love rainbows and kittens with pizza'
    , resave: false
    , saveUninitialized: false
    , cookie: {
      path: '/'
      , httpOnly: true
      , maxAge: 365 * 24 * 3600 * 1000   // One year for example 
    }
    , store: new NedbStore({ filename: __dirname+'/data/sessions.db' })
  });


  module.exports = Session;

} ());