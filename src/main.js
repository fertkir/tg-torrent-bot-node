#!/usr/bin/env node

import "dotenv/config.js";
import messageHandler from "./configs/message-handler.js";
import completesWatcher from "./configs/completes-watcher.js";

messageHandler.handle();
completesWatcher.watch(); // fixme do not run if no COMPLETES_WATCHDIR env var
