import MessageHandler from '../components/message-handler.js';
import telegramBot from './telegram-bot.js';
import rutrackerApi from './rutracker-api.js';
import downloadsTracker from './downloads-tracker.js';

const messageHandler = new MessageHandler(
  telegramBot,
  rutrackerApi,
  downloadsTracker,
  process.env.TORRENTS_DIR,
);

export default messageHandler;
