const TelegramBot = require("node-telegram-bot-api");
const { getRandomBeer, deleteBeerById } = require("../beerServices");
const {
  writeOrUpdateUser,
  getMessagesCount,
  getCountOfUser,
} = require("../statisticServices");

// TODO: change to telegramToken
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const parseUser = (msg) => ({
  chat_id: msg.chat.id,
  title: msg.chat.title,
  first_name: msg.chat.first_name,
  last_name: msg.chat.last_name,
  username: msg.chat.username,
});

const onStatMessage = async (chatId) => {
  const { messagesCount } = (await getMessagesCount())[0];
  const userCount = await getCountOfUser();
  await bot.sendMessage(
    chatId,
    `Кол-во сообщений: *${messagesCount}*\nКол-во пользователей: *${userCount}*`,
    { parse_mode: "Markdown" }
  );
};

const onStartMessage = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Приветствую тебя, благородный ценитель пива, чтобы заролить пиво напиши /roll"
  );
};

const onDefaultMessage = async (chatId) => {
  await bot.sendMessage(chatId, "Чтобы заролить пиво напиши /roll");
};

const onRollBeer = async (chatId) => {
  const { name, photo, id, country, price, strength } = (
    await getRandomBeer()
  )[0];

  await bot
    .sendPhoto(chatId, photo, {
      parse_mode: "Markdown",
      caption: `${name}\nСтрана: ${country}\nПримерная цена: ${price} руб\nКрепость: ${strength}`,
    })
    .then(() => bot.sendMessage(chatId, "Не понравилось? Еще? /roll"))
    .catch(async () => {
      console.log(`${new Date().getDate()}: error when roll`);
      await deleteBeerById(id);
      await onRollBeer(chatId);
    });
};

const listenMessages = () => {
  console.log("start listening messages");
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const user = parseUser(msg);
    const isAdmin = user.username === process.env.OWNER_USERNAME;

    await writeOrUpdateUser(user);

    switch (msg.text) {
      case "/roll":
        await onRollBeer(chatId);
        break;
      case "/start":
        await onStartMessage(chatId);
        break;
      case "/stat":
        if (isAdmin) {
          await onStatMessage(chatId);
        } else {
          await onDefaultMessage(chatId);
        }
        break;
      default:
        await onDefaultMessage(chatId);
    }
  });
};

module.exports = {
  listenMessages,
};
