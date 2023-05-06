const ALLOWED_USERS = (process.env.ALLOWED_USERS || '')
  .split(',')
  .filter(Number)
  .map(Number);

const isForbiddenUser = (userId) => ALLOWED_USERS.length > 0 && !ALLOWED_USERS.includes(userId);

export default class TelegramBotFacade {
  #bot;

  #i18n;

  constructor(bot, i18n) {
    this.#bot = bot;
    this.#i18n = i18n;
  }

  onText(regexp, callback) {
    const i18n = this.#i18n;
    this.#bot.onText(regexp, (...args) => {
      const msg = args[0];
      if (isForbiddenUser(msg.from.id)) {
        return;
      }
      i18n.init(msg);
      msg.setLocale(msg.from.language_code);
      console.log(`Received message "${msg.text}" from user ${msg.from.id}`);
      callback.call(null, ...args);
    });
  }

  sendMessage(...args) {
    const chatId = args[0];
    const message = (args[1] || '').substring(0, 100);
    const promise = this.#bot.sendMessage(...args);
    console.log(`Sent message "${message}" to user ${chatId}`);
    return promise;
  }

  sendDocument(...args) {
    const chatId = args[0];
    const promise = this.#bot.sendDocument(...args);
    console.log(`Sent a document to user ${chatId}`);
    return promise;
  }
}
