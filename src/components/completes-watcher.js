import chokidar from 'chokidar';
import path from 'node:path';
import fs from 'fs';

export default class CompletesWatcher {
  #watcher;

  #downloadsTracker;

  #telegramBot;

  #i18n;

  constructor(downloadsTracker, telegramBot, i18n) {
    this.#watcher = chokidar.watch(process.env.COMPLETES_WATCHDIR, {
      persistent: true,
    });
    this.#downloadsTracker = downloadsTracker;
    this.#telegramBot = telegramBot;
    this.#i18n = i18n;
  }

  watch() {
    this.#watcher.on('add', (filePath) => {
      console.log(`Received download complete event file "${filePath}"`);
      this.#downloadsTracker.remove(path.basename(filePath))
        .then((pendingUsers) => fs.readFile(filePath, 'utf8', (readFileError, data) => {
          if (readFileError) {
            console.error(`Error reading file "${filePath}":`, readFileError);
            return;
          }
          Promise.all(
            pendingUsers.map((user) => {
              this.#i18n.init(user);
              user.setLocale(user.languageCode);
              return this.#telegramBot.sendMessage(user.chatId, user.__('Downloaded "%s"', data));
            }),
          )
            .then(() => fs.unlink(filePath, (removeFileError) => {
              if (removeFileError) {
                console.error(`Error removing file "${filePath}":`, removeFileError);
                return;
              }
              console.log(`Removed file "${filePath}"`);
            }));
        }));
    });
  }
}
