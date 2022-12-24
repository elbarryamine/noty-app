"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const trpcExpress = require("@trpc/server/adapters/express");
const cors = require("cors");
const router_1 = require("./routers/router");
require('dotenv').config();
const app = express();
app.use(cors({ origin: '*' }));
app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: router_1.appRouter,
    createContext: () => ({}),
}));
const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, '', () => console.log(`listen at port ${PORT}`));
//# sourceMappingURL=index.js.map