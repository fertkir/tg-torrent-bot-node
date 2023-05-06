import { I18n } from 'i18n';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const i18n = new I18n({
  directory: path.join(path.dirname(fileURLToPath(import.meta.url)), '../locales'),
  defaultLocale: 'en',
  retryInDefaultLocale: true,
  updateFiles: false,
});

export default i18n;
