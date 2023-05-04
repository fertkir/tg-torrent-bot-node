const ALLOWED_USERS = (process.env.ALLOWED_USERS || '')
    .split(',')
    .filter(Number)
    .map(Number);

const isForbiddenUser = userId => ALLOWED_USERS.length > 0 && !ALLOWED_USERS.includes(userId);

export default class TelegramBotFacade {

    #bot
    #i18n

    constructor(bot, i18n) {
        this.#bot = bot;
        this.#i18n = i18n;
    }

    onText(regexp, callback) {
        const i18n = this.#i18n;
        this.#bot.onText(regexp, function () {
            const msg = arguments[0];
            if (isForbiddenUser(msg.from.id)) {
                return;
            }
            i18n.init(msg);
            msg.setLocale(msg.from.language_code);
            console.log(`Received message "${msg.text}" from user ${msg.from.id}`);
            callback.call(null, ...arguments);
        });
    }

    sendMessage() {
        const chatId = arguments[0];
        const message = (arguments[1] || '').substring(0, 100);
        const promise = this.#bot.sendMessage(...arguments);
        console.log(`Sent message "${message}" to user ${chatId}`);
        return promise;
    }

    sendDocument() {
        const chatId = arguments[0];
        const promise = this.#bot.sendDocument(...arguments);
        console.log(`Sent a document to user ${chatId}`);
        return promise;
    }
}
