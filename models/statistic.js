const mongoose = require("mongoose");

const statistic = new mongoose.Schema({
  chatId: { type: Number, default: null },
  title: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  username: { type: String, default: null },
  messagesCount: { type: Number, default: 0 },
});
const StatisticModel = mongoose.model("statistic", statistic);

module.exports = {
  StatisticModel,
};
