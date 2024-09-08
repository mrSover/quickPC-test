"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, unique: true, required: true },
    description: { type: String, required: true },
});
const RoleModel = (0, mongoose_1.model)('Role', RoleSchema);
exports.default = RoleModel;
