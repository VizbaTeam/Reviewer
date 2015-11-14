
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var reviewSchema = new Schema({
  tag_id: [Number],
  review: String,
  category_id: [Number],
  userID: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
reviewSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});



// create a model using the schema
var Review = mongoose.model('reviews', reviewSchema);

// make this available to our users in our Node applications
module.exports = Review;