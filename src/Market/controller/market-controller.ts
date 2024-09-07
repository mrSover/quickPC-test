import { Request, Response, NextFunction } from 'express';
import marketService from '../service/market-service';

class MarketController {

    async getHotProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await marketService.getHotProducts()
            return res.json(products)
        } catch (e) {
            next(e);
        }
    }
    
    async getProductsbyCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const category: string = req.body.category
            const sortValue: string = req.body.sortValue 
            const sortDirection: number = req.body.sortDirection
            const products = await marketService.getProductsbyCategory(category, sortValue, sortDirection)
            return res.json(products)
        } catch (e) {
            next(e);
        }
    }

    async getComputersByFilters (req: Request, res: Response, next: NextFunction) {
        try {
            const priceBorders: Array<Number> = [req.body.minPrice, req.body.maxPrice] 
            const sortValue: string = req.body.sortValue 
            const sortDirection: number = req.body.sortDirection
            const computers = await marketService.getComputersByFilters(priceBorders, sortValue, sortDirection)
            return res.json(computers)
        } catch (e) {
            next(e);
        }
    }

    async getComponentsByFilters (req: Request, res: Response, next: NextFunction) {
        try {
            const priceBorders: Array<Number> = [req.body.minPrice, req.body.maxPrice] 
            const type: string = req.body.type;
            const products = await marketService.getComponentsByFilters(type, priceBorders)
            return res.json(products)
        } catch (e) {
            next(e);
        }
    }
    
}

export default new MarketController();