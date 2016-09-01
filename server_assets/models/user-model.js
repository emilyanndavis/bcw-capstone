; (function () {

  let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    fb3 = require('firebase'),
    config = {
      apiKey: "AIzaSyDtwXi9TtQ31HQtm4Tb3WyLOjFqTNVhE0Q",
      authDomain: "wildlife-sightings-2444a.firebaseapp.com",
      databaseURL: "https://wildlife-sightings-2444a.firebaseio.com",
      storageBucket: "wildlife-sightings-2444a.appspot.com",
    }
  fb3.initializeApp(config);

  var auth = fb3.auth();

  let LogBook = require('./logbook-model').LogBook;

  let User = DS.defineResource({
    name: 'user',
    endpoint: 'users'
  });


  // function register(email, password, cb) {
  //   auth.createUserWithEmailAndPassword(
  //     email,
  //     password
  //   ).then(function (authData) {
  //     User.create({ id: authData.uid, email: email, img: authData.photoURL || 'http://media.mercola.com/assets/images/food-facts/banana-fb.jpg' }).then(function (user) {
  //       return cb(user);
  //     })
  //   }).catch(function (err) {
  //     return cb(err)
  //   })
  // }

  function register(email, password, cb) {
    auth.createUserWithEmailAndPassword(
      email,
      password
    ).then(function (authData) {
      console.log(authData.AuthCredential);
      let token = { email: email, password: password };
      User.create({ id: authData.uid, email: email, logBookId: authData.uid }).then(function (user) {
        LogBook.create(user.id, function (logbook) {
          user.logbook = logbook;
          return cb(user, token);
        })
      })
    }).catch(function (err) {
      return cb(err)
    })
  }


  function login(email, password, cb) {
    auth.signInWithEmailAndPassword(email, password)
      .then(function (authData) {
        let token = { email: email, password: password };
        User.find(authData.uid).then(function (user) {
          LogBook.find(user.id).then(function (logbook) {
            user.logbook = logbook;
            return cb(user, token);
          }).catch(function (err) {
            return cb(err);
          })
        }).catch(function (err) {
          return cb(err);
        })
      }).catch(function (err) {
        return cb(err);
      })
  }

  module.exports = {
    login: login,
    register: register
  };

} ());