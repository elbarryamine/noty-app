"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNote = void 0;
const config_1 = require("../config");
exports.getNote = config_1.publicProcedure.query(() => ({ note: 'hi' }));
//# sourceMappingURL=notes.js.map