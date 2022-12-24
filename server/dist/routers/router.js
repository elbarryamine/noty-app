"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const noteRouter_1 = require("./note/noteRouter");
const userRouter_1 = require("./user/userRouter");
const trpc_1 = require("../config/trpc");
exports.appRouter = (0, trpc_1.router)({
    note: noteRouter_1.noteRouter,
    user: userRouter_1.userRouter,
});
//# sourceMappingURL=router.js.map