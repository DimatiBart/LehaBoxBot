const TelegramBot = require('node-telegram-bot-api'),
    argv = require('yargs').argv,
    isLehaRight = require('./LehaBox');

const token = argv.token || process.env.token;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/check/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = isLehaRight(chatId);

    bot.sendMessage(chatId, resp);
});