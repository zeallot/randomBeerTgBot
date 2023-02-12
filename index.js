const mongoose = require("mongoose");
const { listenMessages } = require("./services/telegramServices");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("connected");
    listenMessages();
  })
  .catch(() => "not connected");
