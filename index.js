const mongoose = require("mongoose");
const { mongoLink } = require("./config");
const { listenMessages } = require("./services/telegramServices");

mongoose
  .connect(mongoLink)
  .then(() => {
    console.log("connected");
    listenMessages();
  })
  .catch(() => "not connected");
