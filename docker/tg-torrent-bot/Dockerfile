FROM node:18-alpine

ARG VERSION="latest"
# fixme build_version looks this way: tg-torrent-bot@
LABEL build_version="tg-torrent-bot@${VERSION}"

RUN npm install -g tg-torrent-bot@$VERSION

# fixme map users correctly insread, see:
# https://github.com/syncthing/syncthing/blob/main/Dockerfile.strelaysrv#L23
# https://github.com/syncthing/syncthing/blob/main/README-Docker.md
RUN mkdir -p /db && chmod -R 777 /db

ENV DB_FILE=/db/db.json
ENV RUTRACKER_HOST=https://rutracker.org

ENTRYPOINT ["tg-torrent-bot-node"]
