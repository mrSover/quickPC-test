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
const file_service_1 = __importDefault(require("../service/file-service"));
class MarketController {
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.query.category;
                const type = req.query.type;
                const minPrice = Number(req.query.minPrice) || 0;
                const maxPrice = Number(req.query.maxPrice) || Infinity;
                const sortValue = req.query.sortValue || 'is_hot';
                const sortDirection = (Number(req.query.sortDirection) || 1);
                const sortObj = { [sortValue]: sortDirection };
                const from = Number(req.query.from) || 0;
                const to = Number(req.query.to) || 12;
                let products;
                if (category) {
                    products = yield market_service_1.default.getProductsByFilters(category, from, to, [minPrice, maxPrice], sortObj, type);
                }
                else {
                    products = yield market_service_1.default.getAllProducts(sortObj, from, to);
                }
                return res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json({ message: 'Failed to get data' });
                next(e);
            }
        });
    }
    // async getHotProducts(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const products = await marketService.getHotProducts()
    //         return res.status(201).json(products)
    //     } catch (e) {
    //         res.status(500).json({ message: 'Failed to get data'});
    //         next(e);
    //     }
    // }
    // async getProductsbyCategory(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const category: string = req.query.category as string;
    //         const sortValue: string = req.query.sortValue as string;
    //         const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
    //         const sortObj: ISortObj = { [sortValue]: sortDirection };
    //         const products = await marketService.getProductsbyCategory(category, sortObj);
    //         return res.status(200).json(products);
    //     } catch (e) {
    //         res.status(500).json({ message: 'Failed to get data' });
    //         next(e);
    //     }
    // }
    // // Отримання комп'ютерів за фільтрами
    // async getComputersByFilters(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const minPrice: number = Number(req.query.minPrice);
    //         const maxPrice: number = Number(req.query.maxPrice);
    //         const priceBorders: Array<number> = [minPrice, maxPrice];
    //         const sortValue: string = req.query.sortValue as string;
    //         const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
    //         const sortObj: ISortObj = { [sortValue]: sortDirection };
    //         const computers = await marketService.getComputersByFilters(priceBorders, sortObj);
    //         return res.status(200).json(computers);
    //     } catch (e) {
    //         res.status(500).json({ message: 'Failed to get data' });
    //         next(e);
    //     }
    // }
    // // Отримання компонентів за фільтрами
    // async getComponentsByFilters(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const minPrice: number = Number(req.query.minPrice);
    //         const maxPrice: number = Number(req.query.maxPrice);
    //         const priceBorders: Array<number> = [minPrice, maxPrice];
    //         const type: string = req.query.type as string;
    //         const sortValue: string = req.query.sortValue as string;
    //         const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
    //         const sortObj: ISortObj = { [sortValue]: sortDirection };
    //         const products = await marketService.getComponentsByFilters(priceBorders, sortObj, type);
    //         return res.status(200).json(products);
    //     } catch (e) {
    //         res.status(500).json({ message: 'Failed to get data' });
    //         next(e);
    //     }
    // }
    createComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const componentData = req.body;
                const file = req.file;
                if (!file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }
                const fileName = yield file_service_1.default.createFile(file);
                console.log('Saved file:', fileName);
                componentData.img = fileName;
                console.log('Component data:', componentData);
                const newComponent = yield market_service_1.default.createComponent(componentData);
                res.status(201).json({
                    message: 'Component created successfully',
                    component: newComponent
                });
            }
            catch (error) {
                console.error('Failed to create component:', error);
                res.status(500).json({ message: 'Failed to create component' });
            }
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // Отримуємо ID з параметрів запиту
                // Викликаємо сервіс для отримання товару
                const product = yield market_service_1.default.getProductById(id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                return res.json(product);
            }
            catch (error) {
                next(error); // Обробка помилок
            }
        });
    }
    createComputer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const computerData = req.body;
                const newComputer = yield market_service_1.default.createComponent(computerData);
                res.status(201).json({
                    message: 'Computer created successfully',
                    component: newComputer
                });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to create computer' });
            }
        });
    }
}
exports.default = new MarketController();
