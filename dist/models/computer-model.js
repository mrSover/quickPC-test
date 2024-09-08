"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerModel = void 0;
const mongoose_1 = require("mongoose");
const ComputerSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    img: String,
    description: String,
    most_profitable: Boolean,
    components: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Component' }],
});
const ComputerModel = (0, mongoose_1.model)('Computer', ComputerSchema);
exports.ComputerModel = ComputerModel;
