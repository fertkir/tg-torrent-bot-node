#!/usr/bin/env node

import "dotenv/config.js";
import messageHandler from "./config/message-handler.js";

messageHandler.handle();
