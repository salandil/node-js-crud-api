import http from "node:http";
import AppHandler from "./handler.ts";
import { DEFAULT_PORT } from "./helpers/settings.ts";
import "dotenv/config";

const PORT = process.env.PORT || DEFAULT_PORT;

export const server = http.createServer(AppHandler()).listen(PORT, () => {
  console.log(`Process${process.pid} is running on port ${PORT}`);
});
