# Node.js Telegram Torrent Bot

A telegram bot implementation for torrents search and download.

Searches for torrents on supported trackers, gets magnet-links, provides/downloads .torrent files.

Supported torrent-trackers:
* rutracker.org

DISCLAIMER: Please be aware that some materials you can get access to by means of this software might be subjects to copyright laws. Please use this software only for lawful purposes. The author of the software isn't responsible for any violations.

### Installation
```
npm install -g tg-torrent-bot
```

### Configuration

Configuration is done through environment variables.

| Variable         | Description                            |
|------------------|----------------------------------------|
|TELEGRAM_TOKEN    |Telegram bot token (from [@BotFather](https://t.me/BotFather) bot)|
|RUTRACKER_USERNAME|Username for rutracker.org|
|RUTRACKER_PASSWORD|Password for rutracker.org|
|TORRENTS_DIR      |Optional. Directory where to put downloaded .torrent files. If not set, the torrent file will be sent to chat in response.|
|ALLOWED_USERS     |Optional. Comma separated list of telegram user ids, who are allowed to use the bot. If not set, everyone is allowed to use the bot.|
|RUTRACKER_HOST    |Url of rutracker.org (for ability to use a mirror)|
|PROXY_TELEGRAM    |true/false. Should connection to Telegram servers be proxied.|
|PROXY_RUTRACKER   |true/false. Should interaction with rutracker.org be proxied.|
|PROXY_HOST        |Optional if nothing should be proxied. Proxy host.|
|PROXY_PORT        |Optional if nothing should be proxied. Proxy port.|
|PROXY_USERNAME    |Optional if nothing should be proxied, or no proxy auth is required. Proxy username.|
|PROXY_PASSWORD    |Optional if nothing should be proxied, or no proxy auth is required. Proxy password.|
|CURRENT_DOWNLOADS |Required if TORRENTS_DIR is set. Directory where to put download-tracking files.|

### How to run

#### Option 1: Set up environment variables and run
```
export TELEGRAM_TOKEN="<telegram token>"; \
export RUTRACKER_USERNAME="<rutracker username>"; \
export RUTRACKER_PASSWORD="<rutracker password>"; \
export TORRENTS_DIR="/home/username/Torrents"; \
export RUTRACKER_HOST="https://rutracker.org"; \
export PROXY_TELEGRAM="false"; \
export PROXY_RUTRACKER="false"; \
export CURRENT_DOWNLOADS="/home/username/current-downloads"; \
  tg-torrent-bot-node
```

#### Option 2: Set up integration with Transmission using Ansible

Ansible Role: https://galaxy.ansible.com/fertkir/tg_torrent_bot_transmission

Github: https://github.com/fertkir/tg-torrent-bot-transmission
