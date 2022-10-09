const OriginalTelegramBot = require('node-telegram-bot-api');
const { I18n } = require('i18n');
const path = require('path');

const i18n = new I18n({
	directory: path.join(__dirname, '../locales'),
	defaultLocale: 'en',
	retryInDefaultLocale: true,
	updateFiles: false
});

function getTelegramProxySettings() {
	if (process.env.PROXY_TELEGRAM === 'true' && process.env.PROXY_HOST && process.env.PROXY_PORT) {
		if (process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD) {
			return 'http://' + process.env.PROXY_USERNAME + ':' + 
			encodeURIComponent(process.env.PROXY_PASSWORD) + '@' + 
			process.env.PROXY_HOST + ':' + process.env.PROXY_PORT + '/'
		}
		return 'http://' + process.env.PROXY_HOST + ':' + process.env.PROXY_PORT + '/'
	}
}

const ALLOWED_USERS = (process.env.ALLOWED_USERS || '').split(',').filter(Number).map(Number);

function isForbiddenUser(userId) {
	return ALLOWED_USERS.length > 0 && !ALLOWED_USERS.includes(userId);
}

function TelegramBot() {
	this.bot = new OriginalTelegramBot(
		process.env.TELEGRAM_TOKEN, 
		{
			polling: true,
			request: {
				proxy: getTelegramProxySettings()
			}
		});
}

TelegramBot.prototype.onText = function (regexp, callback) {
	this.bot.onText(regexp, function() {
		const msg = arguments[0];
		if (isForbiddenUser(msg.from.id)) {
			return;
		}
		i18n.init(msg);
		msg.setLocale(msg.from.language_code);
		callback.call(null, ...arguments);
	});
}

TelegramBot.prototype.sendMessage = function () {
	return this.bot.sendMessage(...arguments);
}

TelegramBot.prototype.sendDocument = function () {
	return this.bot.sendDocument(...arguments);
}

module.exports = TelegramBot;
