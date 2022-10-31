const mongoose = require("mongoose");

const beerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  price: Number,
  strength: Number,
  photo: String,
  type: String,
});
const Beer = mongoose.model("EditedBeer", beerSchema);

module.exports = {
  BeerModel: Beer,
};
