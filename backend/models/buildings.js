const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test?retryWrites=true";

mongoose.connect(url)
.then(() => {
  console.log('connected buildings');
})
.catch(err => {
  console.log(err);
});

const uniqueValidator = require('mongoose-unique-validator');

const buildingSchema = mongoose.Schema({
  nameBuilding: { type: String, required: true, unique: true},
  address: { type: String, required: true},
  info: { type: String },
  // rooms: {type: Array }
});

buildingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Building', buildingSchema);
