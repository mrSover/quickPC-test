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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_model_1 = require("../models/component-model");
const computer_model_1 = require("../models/computer-model");
const product_model_1 = require("../models/product-model");
const product_catalog_dto_1 = __importDefault(require("../dtos/product-catalog-dto"));
const product_item_dto_1 = __importDefault(require("../dtos/product-item-dto"));
class MarketService {
    getAllProducts(sortObj, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel
                .find()
                .populate('item_id')
                .sort(sortObj);
            const prices = products.map(product => {
                const item = product.item_id;
                return item.price;
            });
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const count = products.length;
            const result = (this
                .removeNesting(products)
                .map((product) => new product_catalog_dto_1.default(product)))
                .slice(from, to);
            return { count, minPrice, maxPrice, result };
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.ProductModel
                .findById(id)
                .populate('item_id');
            return new product_item_dto_1.default(this.removeNesting(product));
        });
    }
    getProductsByFilters(category, from, to, priceBorders, sortObj, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield product_model_1.ProductModel
                .find({ category })
                .populate('item_id')
                .sort(sortObj);
            products = products.filter(product => {
                const item = product.item_id;
                return item.price >= priceBorders[0] && item.price <= priceBorders[1];
            });
            if (type) {
                products = products.filter(product => {
                    const item = product.item_id;
                    return item.type === type;
                });
            }
            const prices = products.map(product => {
                const item = product.item_id;
                return item.price;
            });
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const count = products.length;
            const result = this
                .removeNesting(products)
                .map((product) => new product_catalog_dto_1.default(product))
                .slice(from, to);
            return { count, minPrice, maxPrice, result };
        });
    }
    createComponent(componentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const component = new component_model_1.ComponentModel(componentData);
            const savedComponent = yield component.save();
            const product = new product_model_1.ProductModel({
                category: 'Component',
                item_id: savedComponent._id
            });
            yield product.save();
            return savedComponent;
        });
    }
    createComputer(computerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const computer = new computer_model_1.ComputerModel(computerData);
            const savedComputer = yield computer.save();
            const product = new product_model_1.ProductModel({
                category: 'Computer',
                item_id: savedComputer._id
            });
            yield product.save();
            return savedComputer;
        });
    }
    removeNesting(data) {
        if (Array.isArray(data)) {
            return data.map(item => {
                const itemData = JSON.parse(JSON.stringify(item.item_id));
                return Object.assign(Object.assign({}, itemData), { _id: item._id, category: item.category });
            });
        }
        else {
            const itemData = JSON.parse(JSON.stringify(data.item_id));
            return Object.assign(Object.assign({}, itemData), { _id: data._id, category: data.category });
        }
    }
}
exports.default = new MarketService();
