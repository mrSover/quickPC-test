import { ObjectId, Types } from 'mongoose';
import { ComponentModel } from '../models/component-model';
import { ComputerModel } from '../models/computer-model';
import { ProductModel } from '../models/product-model';

class MarketService {

    async getHotProducts () {
        const hotProducts = await ProductModel
        .find()
        .populate('item_id')
        .where('most_profitable')
        .equals(true);
        return hotProducts;
   }

   async getProductsbyCategory(category: string, sortObj:  { [key: string]: 1 | -1 }) {
    const products = await ProductModel
        .find({ category: category })
        .populate('item_id')
        .sort(sortObj); 
    
    return products;
}

   async getComputersByFilters (priceBorders: Array<Number>, sortObj:  { [key: string]: 1 | -1 }) {
    const computers = await ComputerModel
    .find({
        price: {
            $gte: priceBorders[0],  
            $lte: priceBorders[1]   
        }
    });
    return computers;
    }

    async getComponentsByFilters (type: string, priceBorders: Array<Number>, sortObj:  { [key: string]: 1 | -1 }) {
        const components = await ComponentModel
        .find({
            output_price: {
                $gte: priceBorders[0],  
                $lte: priceBorders[1]   
            },
            type: type
        });
        return components;
    }

}

export default new MarketService();