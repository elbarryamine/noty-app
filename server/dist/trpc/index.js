"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.publicProcedure = exports.middleware = exports.router = exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const trpc = server_1.initTRPC.create();
const router = trpc.router;
exports.router = router;
const middleware = trpc.middleware;
exports.middleware = middleware;
const publicProcedure = trpc.procedure;
exports.publicProcedure = publicProcedure;
const createContext = ({ req, res }) => ({});
exports.createContext = createContext;
const appRouter = router({
    notes: publicProcedure.query(() => 'hi'),
});
exports.appRouter = appRouter;
//# sourceMappingURL=index.js.map