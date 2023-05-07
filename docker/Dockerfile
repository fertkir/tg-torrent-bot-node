FROM node:17-alpine

RUN npm install -g tg-torrent-bot@$VERSION

ENV DB_FILE=/db.json
ENV RUTRACKER_HOST=https://rutracker.org

ENTRYPOINT ["tg-torrent-bot-node"]
