import { Request, Response, NextFunction } from 'express';
import marketService from '../service/market-service';
import { IComponent } from '../models/component-model';
import { ISortObj } from '../models/custom-types';
import filesService from "../service/file-service";
import { error } from 'console';

class MarketController { 

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const category = req.query.category as string;
            const type = req.query.type as string;
            const minPrice = Number(req.query.minPrice) || 0;
            const maxPrice = Number(req.query.maxPrice) || Infinity;
            const sortValue = req.query.sortValue as string || 'is_hot';
            const sortDirection: 1 | -1 = (Number(req.query.sortDirection) || 1) as 1 | -1;
            const from = Number(req.query.from) || 0;
            const to = Number(req.query.to) || 12;
    
            let products;
    
            if (category) {
                products = await marketService.getProductsByFilters(category, from, to, [minPrice, maxPrice], sortValue, sortDirection, type);
            } else {
                products = await marketService.getAllProducts(sortValue, sortDirection, from, to);
            }
    
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
            const { id } = req.params; 


            const product = await marketService.getProductById(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            next(error); 
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
