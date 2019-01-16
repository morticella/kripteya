const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test?retryWrites=true";

mongoose.connect(url)
.then(() => {
  console.log('connected users');
})
.catch(err => {
  console.log(err);
});

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  user: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  level: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

