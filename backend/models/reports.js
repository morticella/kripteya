const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test?retryWrites=true";

mongoose.connect(url)
.then(() => {
  console.log('connected reports');
})
.catch(err => {
  console.log(err);
});

const uniqueValidator = require('mongoose-unique-validator');

const reportsSchema = mongoose.Schema({
  now: { type: Date, required: true},
  namePayment: { type: String, required: true},
  idCustomer: { type: String },
  idBuilding: { type: String, required: true },
  idRoom: { type: String },
  from: { type: Date },
  to: { type: Date },
  amount: { type: Number, required: true },
  deposit: { type: Number },
  info: { type: String },
  type: { type: String, required: true },
  paymentType: {type: String, required: true }
});

reportsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Report', reportsSchema);
