FROM node:18-alpine

ARG VERSION
LABEL build_version="tg-torrent-bot@${VERSION}"

RUN npm install -g tg-torrent-bot@$VERSION

ENV DB_FILE=/db.json
ENV RUTRACKER_HOST=https://rutracker.org

ENTRYPOINT ["tg-torrent-bot-node"]
