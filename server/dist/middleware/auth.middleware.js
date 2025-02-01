"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email || req.params.email;
        if (!email) {
            return res.status(401).json({ error: "Email is required" });
        }
        next();
    }
    catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({
            error: "Authentication failed",
        });
    }
});
exports.authCheck = authCheck;
//# sourceMappingURL=auth.middleware.js.map