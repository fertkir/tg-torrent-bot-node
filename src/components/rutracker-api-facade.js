import { NotAuthorizedError } from 'rutracker-api-with-proxy/lib/errors.js';

export default class RutrackerApiFacade {
  #rutrackerApi;

  #username;

  #password;

  constructor(rutrackerApi, host, username, password) {
    this.#rutrackerApi = rutrackerApi;
    this.host = host;
    this.#username = username;
    this.#password = password;
  }

  search({
    query,
    sort,
    order,
  }) {
    return this.#loginIfNeeded.call(this, () => this.#rutrackerApi.search({
      query,
      sort,
      order,
    }));
  }

  download(id) {
    return this.#loginIfNeeded.call(this, () => this.#rutrackerApi.download(id));
  }

  getMagnetLink(id) {
    return this.#loginIfNeeded.call(this, () => this.#rutrackerApi.getMagnetLink(id));
  }

  #loginIfNeeded(query) {
    return query()
      .catch((e) => {
        if (e instanceof NotAuthorizedError) {
          return this.#rutrackerApi
            .login({
              username: this.#username,
              password: this.#password,
            })
            .then(() => query());
        }
        throw e;
      });
  }
}
