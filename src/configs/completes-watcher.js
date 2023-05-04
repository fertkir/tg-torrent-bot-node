import CompletesWatcher from "../components/completes-watcher.js";
import telegramBot from "./telegram-bot.js";
import downloadsTracker from "./downloads-tracker.js";

const completesWatcher = new CompletesWatcher(downloadsTracker, telegramBot);

export default completesWatcher;
