const { StatisticModel } = require("../../models/statistic");

const writeOrUpdateUser = (user) => {
  return StatisticModel.findOneAndUpdate(
    { chatId: user.chat_id },
    { $set: { ...user }, $inc: { messagesCount: 1 } },
    { upsert: true }
  ).exec();
};

const getMessagesCount = () => {
  return StatisticModel.aggregate([
    { $group: { _id: null, messagesCount: { $sum: "$messagesCount" } } },
  ]).exec();
};

const getCountOfUser = () => {
  return StatisticModel.count();
};

module.exports = {
  writeOrUpdateUser,
  getMessagesCount,
  getCountOfUser,
};
