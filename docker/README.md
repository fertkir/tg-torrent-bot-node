# Telegram Torrent Bot in Docker

## Installation
1. Create a telegram token using [@BotFather](https://t.me/BotFather).
2. [Select your desired setup](#setups).
3. Fill credentials and adjust other settings, if needed.
4. `docker-compose up -d`

<h2 id="setups">Setups</h3>

### Standalone bot
In this setup it will send you magnet links or .torrent files right into chat.
This can be run, for instance, in a VPS.
```yaml
# compose/standalone/docker-compose.yml

version: "3"

services:
  tg-torrent-bot:
    image: tg-torrent-bot:latest
    container_name: tg-torrent-bot
    restart: unless-stopped
    environment:
      - TELEGRAM_TOKEN=<telegram token>
      - RUTRACKER_USERNAME=<rutracker username>
      - RUTRACKER_PASSWORD=<rutracker password>

```
