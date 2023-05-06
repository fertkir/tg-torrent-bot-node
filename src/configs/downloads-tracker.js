import DownloadsTracker from '../components/downloads-tracker.js';
import db from './database.js';

const downloadsTracker = new DownloadsTracker(db);

export default downloadsTracker;
