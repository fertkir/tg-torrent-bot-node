# Telegram Torrent Bot
[![GitHub](https://img.shields.io/github/issues/fertkir/tg-torrent-bot-node?logo=github)](https://github.com/fertkir/tg-torrent-bot-node "view the source code")
[![NpmJs](https://img.shields.io/npm/v/tg-torrent-bot?logo=npm)](https://www.npmjs.com/package/tg-torrent-bot "npm package")
[![Ansible Galaxy](https://img.shields.io/static/v1.svg?label=collection&message=fertkir.tg_torrent_bot&logo=ansible&color=blue)](https://galaxy.ansible.com/fertkir/tg_torrent_bot "Ansible Galaxy collection")
[![DockerHub](https://img.shields.io/docker/v/fertkir/tg-torrent-bot?logo=docker)](https://hub.docker.com/r/fertkir/tg-torrent-bot "view on DockerHub")

A telegram bot implementation for torrents search and download.

Searches for torrents on supported trackers, gets magnet-links, provides/downloads .torrent files.

Supported torrent-trackers:

* rutracker.org

DISCLAIMER: Please be aware that some materials you can get access to by means of this software might be subjects to
copyright laws. Please use this software only for lawful purposes. The author of the software isn't responsible for any
violations.

### Installation

```
npm install -g tg-torrent-bot
```

### Configuration

Configuration is done through environment variables.

| Variable           | Description                                                                                                                          |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| TELEGRAM_TOKEN     | Telegram bot token (from [@BotFather](https://t.me/BotFather) bot)                                                                   |
| WEBHOOK_URL        | Optional if polling interaction is okay for you. Example: https://<app-name>.herokuapp.com:443                                       |
| WEBHOOK_PORT       | Optional if polling interaction is okay for you. Port on which the bot will be listening for requests from Telegram.                 |
| RUTRACKER_USERNAME | Username for rutracker.org                                                                                                           |
| RUTRACKER_PASSWORD | Password for rutracker.org                                                                                                           |
| TORRENTS_DIR       | Optional. Directory where to put downloaded .torrent files. If not set, the torrent file will be sent to chat in response.           |
| ALLOWED_USERS      | Optional. Comma separated list of telegram user ids, who are allowed to use the bot. If not set, everyone is allowed to use the bot. |
| RUTRACKER_HOST     | Url of rutracker.org (for ability to use a mirror)                                                                                   |
| PROXY_TELEGRAM     | true/false. Should connection to Telegram servers be proxied.                                                                        |
| PROXY_RUTRACKER    | true/false. Should interaction with rutracker.org be proxied.                                                                        |
| PROXY_HOST         | Optional if nothing should be proxied. Proxy host.                                                                                   |
| PROXY_PORT         | Optional if nothing should be proxied. Proxy port.                                                                                   |
| PROXY_PROTOCOL     | Possible values: http, https, socks5. Default value: http                                                                            |
| PROXY_USERNAME     | Optional if nothing should be proxied, or no proxy auth is required. Proxy username.                                                 |
| PROXY_PASSWORD     | Optional if nothing should be proxied, or no proxy auth is required. Proxy password.                                                 |
| DB_FILE            | Required if TORRENTS_DIR is set. JSON-database to track which user waits for which torrent to download.                              |
| COMPLETES_WATCHDIR | Required if TORRENTS_DIR is set. Directory to receive "download complete" event-files.                                               |

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
export DB_FILE="/home/username/bot/db.json"; \
export COMPLETES_WATCHDIR="/home/username/bot/completes-watchdir"; \
  tg-torrent-bot-node
```

#### Option 2: Set up integration with Transmission using Ansible

Ansible Role: https://galaxy.ansible.com/fertkir/tg_torrent_bot_transmission

Github: https://github.com/fertkir/tg-torrent-bot-transmission
