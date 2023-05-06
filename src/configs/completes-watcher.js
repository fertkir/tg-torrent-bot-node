import CompletesWatcher from '../components/completes-watcher.js';
import telegramBot from './telegram-bot.js';
import downloadsTracker from './downloads-tracker.js';
import i18n from './i18n.js';

const completesWatcher = new CompletesWatcher(downloadsTracker, telegramBot, i18n);

export default completesWatcher;
