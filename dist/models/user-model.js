"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    role: { type: String, default: 'USER' },
    activationLink: { type: String },
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
