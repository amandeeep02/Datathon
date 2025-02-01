"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ["beginner", "moderate", "pro"],
        required: true,
    },
    investmentTimeline: {
        type: String,
        enum: ["long-term", "short-term"],
        required: true,
    },
    investmentBudget: {
        type: Number,
        required: true,
    },
    tradingStrategy: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Users", UserSchema);
//# sourceMappingURL=user.model.js.map