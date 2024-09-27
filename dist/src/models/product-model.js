"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    category: {
        type: String,
        enum: ['Computer', 'Component', 'Monitor', 'Periphery'],
        required: true,
    },
    item_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: 'category', // Динамічне посилання на колекції
    },
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.ProductModel = ProductModel;
