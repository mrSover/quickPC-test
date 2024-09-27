"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerModel = void 0;
const mongoose_1 = require("mongoose");
const ComputerSchema = new mongoose_1.Schema({
    name: String,
    count: Number,
    input_price: Number,
    price: Number,
    type: String, // офісний або ігровий
    description: String,
    is_on_sale: Boolean,
    is_hot: Boolean,
    img: String,
    item_info: [{
            name: String,
            value: String
        }]
});
const ComputerModel = (0, mongoose_1.model)('Computer', ComputerSchema);
exports.ComputerModel = ComputerModel;
