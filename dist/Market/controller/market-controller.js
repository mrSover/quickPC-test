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
const market_service_1 = __importDefault(require("../service/market-service"));
class MarketController {
    getHotProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield market_service_1.default.getHotProducts();
                return res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getProductsbyCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.body.category;
                const sortObj = { [req.body.sortValue]: req.body.sortDirection };
                const products = yield market_service_1.default.getProductsbyCategory(category, sortObj);
                return res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getComputersByFilters(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceBorders = [req.body.minPrice, req.body.maxPrice];
                const sortObj = { [req.body.sortValue]: req.body.sortDirection };
                const computers = yield market_service_1.default.getComputersByFilters(priceBorders, sortObj);
                return res.json(computers);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getComponentsByFilters(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceBorders = [req.body.minPrice, req.body.maxPrice];
                const type = req.body.type;
                const sortObj = { [req.body.sortValue]: req.body.sortDirection };
                const products = yield market_service_1.default.getComponentsByFilters(type, priceBorders, sortObj);
                return res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new MarketController();
