const OriginalRutrackerApi = require('rutracker-api-with-proxy');
const { NotAuthorizedError } = require("rutracker-api-with-proxy/lib/errors");

function getRutrackerProxySettings() {
	if (process.env.PROXY_RUTRACKER === 'true' && process.env.PROXY_HOST && process.env.PROXY_PORT) {
		if (process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD) {
			return {
				host: process.env.PROXY_HOST,
				port: process.env.PROXY_PORT,
				auth: {
					username: process.env.PROXY_USERNAME,
					password: process.env.PROXY_PASSWORD
				}
			}
		}
		return {
			host: process.env.PROXY_HOST,
			port: process.env.PROXY_PORT
		}
	}
}

function loginIfNeeded(query) {
	return query().catch(e => {
		if (e instanceof NotAuthorizedError) {
			return this.rutracker.login({
				username: process.env.RUTRACKER_USERNAME,
				password: process.env.RUTRACKER_PASSWORD
			})
			.then(() => query());
		}
	});
}

function RutrackerApi() {
	this.rutracker = new OriginalRutrackerApi(
		process.env.RUTRACKER_HOST, 
		getRutrackerProxySettings());
}

RutrackerApi.prototype.search = function ({ query, sort, order }) {
	return loginIfNeeded.call(this, () => this.rutracker.search({ query, sort, order }));
}

RutrackerApi.prototype.download = function (id) {
	return loginIfNeeded.call(this, () => this.rutracker.download(id));
}

RutrackerApi.prototype.getMagnetLink = function (id) {
	return loginIfNeeded.call(this, () => this.rutracker.getMagnetLink(id));
}

module.exports = RutrackerApi;
