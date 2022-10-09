const fs = require('fs');
const moment = require('moment');
const pretty = require('prettysize');
const RutrackerApi = require('./lib/rutracker-api-wrapper');
const TelegramBot = require('./lib/node-telegram-bot-api-wrapper');

const rutracker = new RutrackerApi();
const bot = new TelegramBot();

// main logic
bot.onText(/^[^\/]/, (msg) => {
    var text = msg.text;
    if (text.includes('#kinopoisk')) { // FIXME: doesn't work, #9
        text = text.match(/Фильм (.+)#/)[1].replace(/["(),]/g, '');
    }
    rutracker.search({query: text, sort: 'seeds', order: 'desc'})
        .then(torrents => {
            const response = torrents.length == 0
            ? msg.__('No results for \"%s\".', text)
            : torrents.slice(0, 10)
                .map(torrent => {
                    return `${torrent.title}\n`
                        + `${torrent.id}\n`
                        + `[${msg.__('Description')}](${process.env.RUTRACKER_HOST}/forum/viewtopic.php?t=${torrent.id})\n`
                        + `S ${torrent.seeds} | L ${torrent.leeches} | ${msg.__('Downloaded')} ${torrent.downloads} | `
                        + `${msg.__('Reg')} ${moment(torrent.registered).format("YYYY-MM-DD")} | ` 
                        + `${msg.__('Size')} ${pretty(torrent.size)}\n`
                        + `*${process.env.TORRENTS_DIR ? msg.__('Download') : msg.__('Get .torrent file')}*: /d\\_${torrent.id}\n`
                        + `${msg.__('Get link')}: /m\\_${torrent.id}\n`;
                    })
                .join("\n");
            bot.sendMessage(msg.chat.id, response, {parse_mode: 'markdown', disable_web_page_preview: true});
        });
});

// downloading .torrent file
bot.onText(/\/d_(.+)/, (msg, match) => {
    const param = match[1];

    if (process.env.TORRENTS_DIR) {
        rutracker.getMagnetLink(param)
            .then(link => {
                fs.writeFile(
                    `${process.env.CURRENT_DOWNLOADS}/${link.match(/urn:btih:([a-z0-9]+)&/i)[1].toLowerCase()}`, 
                    `${msg.chat.id}`, 
                    function (err,data) {
                        if (err) {
                            return console.log(err);
                        }
                    });
            });
    }

    rutracker.download(param)
        .then(stream => {
            if (process.env.TORRENTS_DIR) {
                bot.sendMessage(msg.chat.id, msg.__('Sent for downloading'));
                stream.pipe(fs.createWriteStream(`${process.env.TORRENTS_DIR}/${param}.torrent`));
            } else {
                bot.sendDocument(msg.chat.id, stream, {}, {filename: param + ".torrent"});
            }
        });
});

// getting magnet link
bot.onText(/\/m_(.+)/, (msg, match) => {
    const param = match[1];

    rutracker.getMagnetLink(param)
        .then(link => bot.sendMessage(msg.chat.id, '```\n' + link + '\n```', {parse_mode: 'markdown', disable_web_page_preview: true}));
});

// help
bot.onText(/^\/start|^\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, msg.__('Help Message'));
});
