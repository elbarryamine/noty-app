"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const server_1 = require("@trpc/server");
const jwt = require("jsonwebtoken");
async function createContext({ req }) {
    var _a, _b;
    try {
        const secret = process.env.JWT_SECRET;
        const token = ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) !== null && _b !== void 0 ? _b : '').split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, secret);
            return { user: decoded && decoded.id ? { id: decoded.id } : null };
        }
        return { user: null };
    }
    catch (_c) {
        throw new server_1.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'invalid authorization header',
        });
    }
}
exports.createContext = createContext;
const trpc = server_1.initTRPC.context().create();
exports.default = trpc;
//# sourceMappingURL=trpc.js.map