//require('app-module-path').addPath(__dirname);

import "app-module-path/register";
import * as dotenv from "dotenv";

console.log(process.env.NODE_ENV);

dotenv.config({ path: "./env/" + process.env.NODE_ENV + ".env" });

import app from "./app";

app.listen(process.env.API_PORT, () => {
    console.log("Express server listening on port " + process.env.API_PORT);
});