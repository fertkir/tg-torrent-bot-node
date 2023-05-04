export class PendingUser {
    constructor(chatId, languageCode) {
        this.chatId = chatId;
        this.languageCode = languageCode;
    }
}

export default class DownloadsTracker {

    #db

    constructor(db) {
        this.#db = db;
    }

    async add(torrentHash, pendingUser) {
        const pendingUsers = this.#db.data.downloads[torrentHash] || [];
        if (pendingUsers.map(e => e.chatId).indexOf(pendingUser.chatId) !== -1) {
            return;
        }
        pendingUsers.push(pendingUser);
        this.#db.data.downloads[torrentHash] = pendingUsers;
        await this.#db.write();
    }

    async remove(torrentHash) {
        const pendingUsers = this.#db.data.downloads[torrentHash];
        if (pendingUsers === undefined) {
            return [];
        }
        delete this.#db.data.downloads[torrentHash];
        await this.#db.write();
        return pendingUsers;
    }
}
