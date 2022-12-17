"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const trpcExpress = require("@trpc/server/adapters/express");
const trpc_1 = require("./trpc");
const trpc_2 = require("./trpc");
const cors = require("cors");
const app = express();
app.use(cors({ origin: '*' }));
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: trpc_2.appRouter,
    createContext: trpc_1.createContext,
}));
app.listen(8080, '', () => console.log('listen at port 8080'));
//# sourceMappingURL=index.js.map