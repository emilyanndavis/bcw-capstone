; (function () {

  let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS,
    fb3 = require('../monkey-patch/firebase-3/firebase-node'),
    config = {
      apiKey: "AIzaSyDtwXi9TtQ31HQtm4Tb3WyLOjFqTNVhE0Q",
      authDomain: "wildlife-sightings-2444a.firebaseapp.com",
      databaseURL: "https://wildlife-sightings-2444a.firebaseio.com",
      storageBucket: "wildlife-sightings-2444a.appspot.com",
    }

  fb3.initializeApp(config);;

  let auth = fb3.auth();

  let LogBook = require('./logbook-model');
  
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
      User.create({ id: authData.uid, email: email, logBookId: authData.uid}).then(function (user) {
        LogBook.create(user.id, function(logbook){
          return cb(user);
        })
      })
    }).catch(function (err) {
      return cb(err)
    })
  }


  function login(email, password, cb) {
    auth.signInWithEmailAndPassword(email, password)
      .then(function (authData) {
        User.find(authData.uid).then(function (user) {
          return cb(user);
        })
      }).catch(function (err) {
        return cb(err);
      })
  }

  module.exports = {
    login: login,
    register: register,
  };

} ());