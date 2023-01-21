import "dotenv/config";
import { client } from "./client";

import "./commands";
import "./events";

client.initialize();
