var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Review = require('../models/Review.js');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'Reviewer'
  });
});

/* GET User page. */
router.get('/user', function(req, res) {
  res.render('user', {
    title: "User"
  })
});

/* GET Results page. */
router.get('/search', function(req, res) {
        var searchThisTags = req.query.tag;
        if (searchThisTags === 'undefined')
          res.render('search', {
            title: "Search",
            tag: "no tag available"

          })
        else {

          console.log("tag is " + searchThisTags);

          Review.find({tag_id: searchThisTags.toLowerCase()}, 'review userID', function(err, results) {
            if (err) throw err;

            console.log(results);
            res.render('search', {
              title: "Search",
              results: results
            })
          });
        }

});

/* GET All page. */
router.get('/all', function(req, res) {

  Review.find(function(err, reviews) {
    res.send(reviews);
  });
});

/*
router.get('/createReview', function(req, res) {

tag_id_val = "DoMatI";
console.log(tag_id_val.toLowerCase());
var newReview = Review ({
   tag_id: ["tag@#",tag_id_val.toLowerCase()],
  review: "some new review from the code",
  category_id: [5, 7, 9],
  userID: "aleksandar.sajdovski"
});

  newReview.save(function(err) {
  if (err) console.log(err);

  console.log('Review created!');
});

});
router.get('/users', function(req, res) {

// create a new user
var newUser = User({
  userID: 'starlord55',
  password: 'password',
  mail: 'test@mail.com'
});
newUser.dudify();
newUser.save(function(err) {
  if (err) console.log(err.errmsg);

  console.log('User created!');
});
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});

//THe code bellow is test for saving the Review in DB 
var newReview = Review ({
   tag_id: [11,22],
  review: "the first review from the code",
  category_id: [5, 7, 9],
  userID: "aleksandar.sajdovski"
});

  newReview.save(function(err) {
  if (err) console.log(err);

  console.log('Review created!');
});


*/
module.exports = router;