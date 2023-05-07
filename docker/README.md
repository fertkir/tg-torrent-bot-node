# Telegram Torrent Bot in Docker
[![GitHub](https://img.shields.io/static/v1.svg?label=tg-torrent-bot-docker&message=GitHub&logo=github)](https://github.com/fertkir/tg-torrent-bot-docker "view the source code")

## Installation
1. Create a telegram token using [@BotFather](https://t.me/BotFather).
2. [Select your desired setup](#setups).
3. Fill credentials and adjust other settings, if needed.
4. `docker compose up`

<h2 id="setups">Setups</h3>

### Standalone bot
In this setup it will send you magnet links or .torrent files right into chat.
This can be run, for instance, in a VPS.
```yaml
# compose/standalone/docker-compose.yml

version: "3"

services:
  tg-torrent-bot:
    image: fertkir/tg-torrent-bot:latest
    container_name: tg-torrent-bot
    restart: unless-stopped
    environment:
      - TELEGRAM_TOKEN=<telegram token> # TODO: replace with your telegram token
      - RUTRACKER_USERNAME=<rutracker username> # TODO: replace with your rutracker username
      - RUTRACKER_PASSWORD=<rutracker password> # TODO: replace with your rutracker password

```

### Integrated with Transmission
Torrent files will be put to Transmission's watch directory and Transmission will download them.
Good setup for a home server.
```yaml
# compose/transmission/docker-compose.yml

version: "3"

services:
  tg-torrent-bot:
    image: fertkir/tg-torrent-bot:latest
    container_name: tg-torrent-bot
    restart: unless-stopped
    environment:
      - TELEGRAM_TOKEN=<telegram token> # TODO: replace with your telegram token
      - RUTRACKER_USERNAME=<rutracker username> # TODO: replace with your rutracker username
      - RUTRACKER_PASSWORD=<rutracker password> # TODO: replace with your rutracker password
      - TORRENTS_DIR=/torrents
      - COMPLETES_WATCHDIR=/completes
    volumes:
      - torrents:/torrents
      - completes:/completes
  transmission:
    image: linuxserver/transmission:latest
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - /home/fertkir/Downloads:/downloads
      - torrents:/watch
      - completes:/completes
    ports:
      - "9091:9091"
      - "51413:51413"
      - "51413:51413/udp"
    restart: unless-stopped
volumes:
  torrents:
  completes:

```
