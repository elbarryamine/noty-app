"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.procedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const t = server_1.initTRPC.create();
exports.router = t.router;
exports.procedure = t.procedure;
exports.appRouter = (0, exports.router)({
    note: exports.procedure.query(() => {
        return {
            note: `hello`,
        };
    }),
});
//# sourceMappingURL=router.js.map