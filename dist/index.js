"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const PORT = process.env.PORT;
http.createServer(app_1.default).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map