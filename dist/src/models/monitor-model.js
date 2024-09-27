"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorModel = void 0;
const mongoose_1 = require("mongoose");
const MonitorSchema = new mongoose_1.Schema({
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
const MonitorModel = (0, mongoose_1.model)('Monitor', MonitorSchema);
exports.MonitorModel = MonitorModel;
