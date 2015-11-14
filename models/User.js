
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  userID: { type: String, required: true, unique: true },
  password:  { type: String, required: true } ,
  location: String,
  mail: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.userID = this.userID + '-dude'; 

  return this.userID;
};

// create a model using the schema
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;