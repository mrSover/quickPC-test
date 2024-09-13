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
            const category: string = req.body.category
            const sortObj: ISortObj = { [req.body.sortValue ]: req.body.sortDirection};
            const products = await marketService.getProductsbyCategory(category, sortObj)
            return res.status(201).json(products)
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data'});
            next(e);
        }
    }

    async getComputersByFilters (req: Request, res: Response, next: NextFunction) {
        try {
            const priceBorders: Array<Number> = [req.body.minPrice, req.body.maxPrice] 
            const sortObj: ISortObj = { [req.body.sortValue ]: req.body.sortDirection};
            const computers = await marketService.getComputersByFilters(priceBorders, sortObj)
            return res.status(201).json(computers)
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data'});
            next(e);
        }
    }

    async getComponentsByFilters (req: Request, res: Response, next: NextFunction) {
        try {
            const priceBorders: Array<Number> = [req.body.minPrice, req.body.maxPrice] 
            const type: string = req.body.type;
            const sortObj: ISortObj = { [req.body.sortValue ]: req.body.sortDirection};
            const products = await marketService.getComponentsByFilters(priceBorders, sortObj, type)
            return res.status(201).json(products)
        } catch (e) {
            res.status(500).json({ message: 'Failed to get data'});
            next(e);
        }
    }

    async createComponent(req: Request, res: Response) {
        try {
            const componentData = req.body as IComponent;
            const file = req.file;
    
            console.log('File:', file);  // Check if file is present
    
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