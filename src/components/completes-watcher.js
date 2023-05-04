import chokidar from "chokidar";
import path from "node:path";
import downloadsTracker from "../configs/downloads-tracker.js";
import fs from "fs";
import i18n from "../configs/i18n.js";

export default class CompletesWatcher {

    #watcher
    #downloadsTracker
    #telegramBot

    constructor(downloadsTracker, telegramBot) {
        this.#watcher = chokidar.watch(process.env.COMPLETES_WATCHDIR, {
            persistent: true
        });
        this.#downloadsTracker = downloadsTracker;
        this.#telegramBot = telegramBot;
    }


    watch() {
        this.#watcher.on('add', filePath => {
            console.log(`Received download complete event file "${filePath}"`);
            downloadsTracker.remove(path.basename(filePath)).then(pendingUsers =>
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file "${filePath}":`, err);
                        return;
                    }
                    Promise.all(
                        pendingUsers.map(user => {
                            i18n.init(user);
                            user.setLocale(user.languageCode);
                            return this.#telegramBot.sendMessage(user.chatId, user.__('\"%s\" downloaded', data))
                        })
                    ).then(() => {
                        fs.unlink(filePath, err => {
                            if (err) {
                                console.error(`Error removing file "${filePath}":`, err);
                                return;
                            }
                            console.log(`Removed file "${filePath}"`);
                        })
                    })
                }));
        });
    }
}
