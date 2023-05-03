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
            console.log(`User ${msg.from.id} sent message "${msg.text}"`);
            callback.call(null, ...arguments);
        });
    }

    sendMessage() {
        return this.#bot.sendMessage(...arguments);
    }

    sendDocument() {
        return this.#bot.sendDocument(...arguments);
    }
}
