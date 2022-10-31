const { BeerModel } = require("../../models/beer");

const getAllBeer = async () => {
  return BeerModel.find({});
};

const writeOneBeer = (beer) => {
  return BeerModel.create(beer);
};

const writeManyBeer = async (beerList) => {
  return await BeerModel.insertMany(beerList);
};

const deleteBeerById = (id) => {
  return BeerModel.deleteOne({ id });
};

const getRandomBeer = async () => {
  return BeerModel.aggregate().sample(1).exec();
};

module.exports = {
  getRandomBeer,
  getAllBeer,
  deleteBeerById,
  writeManyBeer,
};
