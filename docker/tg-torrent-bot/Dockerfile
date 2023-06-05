FROM node:18-alpine

ARG VERSION="latest"
LABEL build_version="tg-torrent-bot@${VERSION}"

RUN npm install -g tg-torrent-bot@$VERSION

RUN mkdir -p /db && chmod -R 777 /db

ENV DB_FILE=/db/db.json
ENV RUTRACKER_HOST=https://rutracker.org

ENTRYPOINT ["tg-torrent-bot-node"]
