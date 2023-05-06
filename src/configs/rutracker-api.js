import { SocksProxyAgent } from 'socks-proxy-agent';
import RutrackerApi from 'rutracker-api-with-proxy';
import RutrackerApiFacade from '../components/rutracker-api-facade.js';

function rutrackerApiProxyConfig() {
  if (process.env.PROXY_RUTRACKER !== 'true') {
    return {};
  }
  const protocol = process.env.PROXY_PROTOCOL || 'http';
  if (protocol.startsWith('socks') && process.env.PROXY_HOST && process.env.PROXY_PORT) {
    return {
      httpsAgent: new SocksProxyAgent({
        protocol,
        hostname: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        username: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD,
      }),
    };
  }
  if (process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD) {
    return {
      proxy: {
        protocol,
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        auth: {
          username: process.env.PROXY_USERNAME,
          password: process.env.PROXY_PASSWORD,
        },
      },
    };
  }
  return {
    proxy: {
      protocol,
      host: process.env.PROXY_HOST,
      port: process.env.PROXY_PORT,
    },
  };
}

const rutrackerApi = new RutrackerApiFacade(
  new RutrackerApi(process.env.RUTRACKER_HOST, rutrackerApiProxyConfig()),
  process.env.RUTRACKER_HOST,
  process.env.RUTRACKER_USERNAME,
  process.env.RUTRACKER_PASSWORD,
);

export default rutrackerApi;
