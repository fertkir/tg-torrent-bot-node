import DownloadsTracker from "../service/downloads-tracker.js";
import db from "./database.js";
import MessageHandler from "../service/message-handler.js";
import telegramBot from "./telegram-bot.js";
import rutrackerApi from "./rutracker-api.js";

const messageHandler = new MessageHandler(
    telegramBot, rutrackerApi, new DownloadsTracker(db), process.env.TORRENTS_DIR);

export default messageHandler;
