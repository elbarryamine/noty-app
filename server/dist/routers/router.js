"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../config/trpc");
const folderRouter_1 = require("./folder/folderRouter");
const noteRouter_1 = require("./note/noteRouter");
const userRouter_1 = require("./user/userRouter");
exports.appRouter = trpc_1.default.router({
    note: noteRouter_1.noteRouter,
    user: userRouter_1.userRouter,
    folder: folderRouter_1.folderRouter,
});
//# sourceMappingURL=router.js.map