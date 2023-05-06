import moment from 'moment/moment.js';
import pretty from 'prettysize';
import fs from 'fs';

import PendingUser from '../model/pending-user.js';

const FORMATTED_MESSAGE_CONFIG = {
  parse_mode: 'markdown',
  disable_web_page_preview: true,
};

export default class MessageHandler {
  #bot;

  #rutrackerApi;

  #downloadsTracker;

  #torrentsDir;

  constructor(bot, rutrackerApi, downloadsTracker, torrentsDir) {
    this.#bot = bot;
    this.#rutrackerApi = rutrackerApi;
    this.#downloadsTracker = downloadsTracker;
    this.#torrentsDir = torrentsDir;
  }

  handle() {
    this.#bot.onText(/^[^/]/, (msg) => this.#main(msg));
    this.#bot.onText(/\/d_(.+)/, (msg, match) => this.#downloadTorrentFile(match, msg));
    this.#bot.onText(/\/m_(.+)/, (msg, match) => this.#getMagnetLink(match, msg));
    this.#bot.onText(/^\/start|^\/help/, (msg) => this.#bot.sendMessage(msg.chat.id, msg.__('Help Message')));
  }

  async #main(msg) {
    let { text } = msg;
    if (text.includes('#kinopoisk')) { // FIXME: doesn't work, #9
      text = text.match(/Фильм (.+)#/)[1].replace(/["(),]/g, '');
    }
    const torrents = await this.#rutrackerApi.search({
      query: text,
      sort: 'seeds',
      order: 'desc',
    });
    const response = torrents.length === 0
      ? msg.__('No results for "%s".', text)
      : torrents.slice(0, 10)
        .map((torrent) => this.#toTorrentDescription(torrent, msg))
        .join('\n');
    await this.#bot.sendMessage(msg.chat.id, response, FORMATTED_MESSAGE_CONFIG);
  }

  #toTorrentDescription(torrent, msg) {
    return `${torrent.title}\n`
      + `${torrent.id}\n`
      + `[${msg.__('Description')}](${this.#rutrackerApi.host}/forum/viewtopic.php?t=${torrent.id})\n`
      + `S ${torrent.seeds} | L ${torrent.leeches} | ${msg.__('Downloaded')} ${torrent.downloads} | `
      + `${msg.__('Reg')} ${moment(torrent.registered)
        .format('YYYY-MM-DD')} | `
      + `${msg.__('Size')} ${pretty(torrent.size)}\n`
      + `*${this.#torrentsDir ? msg.__('Download') : msg.__('Get .torrent file')}*: /d\\_${torrent.id}\n`
      + `${msg.__('Get link')}: /m\\_${torrent.id}\n`;
  }

  #downloadTorrentFile(match, msg) {
    const param = match[1];

    if (this.#torrentsDir) {
      this.#rutrackerApi.getMagnetLink(param)
        .then((link) => {
          const torrentHash = link.match(/urn:btih:([a-z0-9]+)&/i)[1].toLowerCase();
          return this.#downloadsTracker.add(
            torrentHash,
            new PendingUser(msg.chat.id, msg.from.language_code),
          );
        });
    }

    this.#rutrackerApi.download(param)
      .then((stream) => {
        if (this.#torrentsDir) {
          this.#bot.sendMessage(msg.chat.id, msg.__('Sent for downloading'));
          stream.pipe(fs.createWriteStream(`${this.#torrentsDir}/${param}.torrent`));
        } else {
          this.#bot.sendDocument(msg.chat.id, stream, {}, { filename: `${param}.torrent` });
        }
      });
  }

  async #getMagnetLink(match, msg) {
    const param = match[1];
    const link = await this.#rutrackerApi.getMagnetLink(param);
    await this.#bot.sendMessage(msg.chat.id, `\`\`\`\n${link}\n\`\`\``, FORMATTED_MESSAGE_CONFIG);
  }
}
