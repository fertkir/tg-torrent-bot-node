import { SocksProxyAgent } from 'socks-proxy-agent';
import TelegramBot from 'node-telegram-bot-api';
import TelegramBotFacade from '../components/telegram-bot-facade.js';
import i18n from './i18n.js';

function telegramBotProxyConfig() {
  if (process.env.PROXY_TELEGRAM !== 'true') {
    return {};
  }
  const protocol = process.env.PROXY_PROTOCOL || 'http';
  if (protocol.startsWith('socks') && process.env.PROXY_HOST && process.env.PROXY_PORT) {
    return {
      agentClass: SocksProxyAgent,
      agentOptions: {
        protocol,
        hostname: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        username: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD,
      },
    };
  }
  if (process.env.PROXY_HOST && process.env.PROXY_PORT) {
    return {
      proxy: `${protocol}://${process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD
        ? `${process.env.PROXY_USERNAME}:${encodeURIComponent(process.env.PROXY_PASSWORD)}@`
        : ''}${process.env.PROXY_HOST}:${process.env.PROXY_PORT}/`,
    };
  }
  return {};
}

const useWebhook = typeof process.env.WEBHOOK_PORT !== "undefined"
  && typeof process.env.WEBHOOK_URL !== "undefined";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: !useWebhook,
  webHook: !useWebhook ? false : {
    port: process.env.WEBHOOK_PORT
  },
  request: {
    ...telegramBotProxyConfig(),
  },
});

if (useWebhook) {
  bot.setWebHook(`${process.env.WEBHOOK_URL}/bot${process.env.TELEGRAM_TOKEN}`)
}

const telegramBot = new TelegramBotFacade(bot, i18n);

export default telegramBot;
