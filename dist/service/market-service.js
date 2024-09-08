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
const component_model_1 = require("../models/component-model");
const computer_model_1 = require("../models/computer-model");
const product_model_1 = require("../models/product-model");
class MarketService {
    getHotProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const hotProducts = yield product_model_1.ProductModel
                .find()
                .populate('item_id')
                .where('most_profitable')
                .equals(true);
            return hotProducts;
        });
    }
    getProductsbyCategory(category, sortObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel
                .find({ category: category })
                .populate('item_id')
                .sort(sortObj);
            return products;
        });
    }
    getComputersByFilters(priceBorders, sortObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const computers = yield computer_model_1.ComputerModel
                .find({
                price: {
                    $gte: priceBorders[0],
                    $lte: priceBorders[1]
                }
            });
            return computers;
        });
    }
    getComponentsByFilters(type, priceBorders, sortObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = yield component_model_1.ComponentModel
                .find({
                output_price: {
                    $gte: priceBorders[0],
                    $lte: priceBorders[1]
                },
                type: type
            });
            return components;
        });
    }
}
exports.default = new MarketService();
