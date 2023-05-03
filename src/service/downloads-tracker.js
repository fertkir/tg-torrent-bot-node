export default class DownloadsTracker {

    #db

    constructor(db) {
        this.#db = db;
    }

    async add(torrentHash, chatId) {
        const chatIds = this.#db.data.downloads[torrentHash] || [];
        if (chatIds.indexOf(chatId) !== -1) {
            return;
        }
        chatIds.push(chatId);
        this.#db.data.downloads[torrentHash] = chatIds;
        await this.#db.write();
    }

    async remove(torrentHash) {
        const chatIds = this.#db.data.downloads[torrentHash];
        if (chatIds === undefined) {
            return [];
        }
        delete this.#db.data.downloads[torrentHash];
        await this.#db.write();
        return chatIds;
    }
}
