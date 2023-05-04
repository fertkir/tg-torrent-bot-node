#!/usr/bin/env node

import "dotenv/config.js";
import messageHandler from "./configs/message-handler.js";
import completesWatcher from "./configs/completes-watcher.js";

messageHandler.handle();
completesWatcher.watch();
