FROM node:18-alpine

ARG VERSION="latest"
LABEL build_version="tg-torrent-bot@${VERSION}"

RUN npm install -g tg-torrent-bot@$VERSION

ENV PUID=0
ENV PGID=0
USER "$PUID:$PGID"

ENV DB_FILE=/db.json
ENV RUTRACKER_HOST=https://rutracker.org

ENTRYPOINT ["tg-torrent-bot-node"]
