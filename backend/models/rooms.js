const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test?retryWrites=true";

mongoose.connect(url)
.then(() => {
  console.log('connected rooms');
})
.catch(err => {
  console.log(err);
});

const uniqueValidator = require('mongoose-unique-validator');

const roomSchema = mongoose.Schema({
  nameBuilding: { type: String, required: true},
  name: { type: String, required: true},
  beds: { type: Number, required: true },
  rent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  gender: { type: Boolean, required: true},
  notice: { type: Date},
  booked: { type: Date},
});

roomSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Room', roomSchema);
