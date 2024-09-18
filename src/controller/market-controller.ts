import { Request, Response, NextFunction } from 'express';
import marketService from '../service/market-service';
import { IComponent } from '../models/component-model';
import { ISortObj } from '../models/custom-types';
import filesService from "../service/file-service";

class MarketController {

    async getHotProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await marketService.getHotProducts()
            return res.status(201).json(products)
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data'});
            next(e);
        }
    }
    
    async getProductsbyCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const category: string = req.query.category as string;
            const sortValue: string = req.query.sortValue as string;
            const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
            const sortObj: ISortObj = { [sortValue]: sortDirection };
    
            const products = await marketService.getProductsbyCategory(category, sortObj);
            return res.status(200).json(products);
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data' });
            next(e);
        }
    }
    
    // Отримання комп'ютерів за фільтрами
    async getComputersByFilters(req: Request, res: Response, next: NextFunction) {
        try {
            const minPrice: number = Number(req.query.minPrice);
            const maxPrice: number = Number(req.query.maxPrice);
            const priceBorders: Array<number> = [minPrice, maxPrice];
            const sortValue: string = req.query.sortValue as string;
            const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
            const sortObj: ISortObj = { [sortValue]: sortDirection };
    
            const computers = await marketService.getComputersByFilters(priceBorders, sortObj);
            return res.status(200).json(computers);
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data' });
            next(e);
        }
    }
    
    // Отримання компонентів за фільтрами
    async getComponentsByFilters(req: Request, res: Response, next: NextFunction) {
        try {
            const minPrice: number = Number(req.query.minPrice);
            const maxPrice: number = Number(req.query.maxPrice);
            const priceBorders: Array<number> = [minPrice, maxPrice];
            const type: string = req.query.type as string;
            const sortValue: string = req.query.sortValue as string;
            const sortDirection: 1 | -1 = Number(req.query.sortDirection) as 1 | -1; // Пряме використання переданого значення
            const sortObj: ISortObj = { [sortValue]: sortDirection };
    
            const products = await marketService.getComponentsByFilters(priceBorders, sortObj, type);
            return res.status(200).json(products);
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data' });
            next(e);
        }
    }

    async createComponent(req: Request, res: Response) {
        try {
            const componentData = req.body as IComponent;
            const file = req.file;
    
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
    
            const fileName = await filesService.createFile(file);
            console.log('Saved file:', fileName);
    
            componentData.img = fileName;
    
            console.log('Component data:', componentData);
    
            const newComponent = await marketService.createComponent(componentData);
    
            res.status(201).json({
                message: 'Component created successfully',
                component: newComponent
            });
        } catch (error) {
            console.error('Failed to create component:', error);
            res.status(500).json({ message: 'Failed to create component' });
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;  // Отримуємо ID з параметрів запиту

            // Викликаємо сервіс для отримання товару
            const product = await marketService.getProductById(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            next(error);  // Обробка помилок
        }
    }

    async createComputer (req: Request, res: Response) {
        try {
            const computerData = req.body as IComponent
          const newComputer = await marketService.createComponent(computerData); 
      
          res.status(201).json({
            message: 'Computer created successfully',
            component: newComputer
          });
        } catch (error) {
          res.status(500).json({ message: 'Failed to create computer'});
        }   
    }
}

export default new MarketController();