import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const db = new Low(new JSONFile(process.env.DB_FILE), { downloads: {} });
await db.read();

export default db;
