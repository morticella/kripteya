const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test?retryWrites=true";

mongoose.connect(url)
.then(() => {
  console.log('connected customers');
})
.catch(err => {
  console.log(err);
});

const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({
  idBuilding: { type: String, required: true},
  idRoom: { type: String, required: true},
  name: { type: String, required: true},
  rent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  notice: { type: Date},
  booked: { type: Date},
});

customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', customerSchema);
