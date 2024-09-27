"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeripheryModel = void 0;
const mongoose_1 = require("mongoose");
const PeripherySchema = new mongoose_1.Schema({
    name: String,
    count: Number,
    input_price: Number,
    price: Number,
    type: String,
    description: String,
    is_on_sale: Boolean,
    is_hot: Boolean,
    img: String,
    item_info: [{
            name: String,
            value: String
        }]
});
const PeripheryModel = (0, mongoose_1.model)('Periphery', PeripherySchema);
exports.PeripheryModel = PeripheryModel;
