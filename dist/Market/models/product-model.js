"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    category: {
        type: String,
        enum: ['computer', 'component'],
        required: true,
    },
    item_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: 'type',
    },
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.ProductModel = ProductModel;
