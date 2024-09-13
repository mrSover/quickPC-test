import { ObjectId, Types } from 'mongoose';
import { ComponentModel, IComponent } from '../models/component-model';
import { ComputerModel, IComputer } from '../models/computer-model';
import { ProductModel } from '../models/product-model';
import { ISortObj } from '../models/custom-types';

class MarketService {

    async getHotProducts () {
        const hotProducts = await ProductModel
        .find()
        .populate('item_id')
        .where('is_hot')
        console.log (hotProducts)

        return hotProducts;
   }

   async getProductsbyCategory(category: string, sortObj: ISortObj) {
    const products = await ProductModel
        .find({ category: category })
        .populate('item_id')
        .sort(sortObj); 
        console.log (products)
    return products;
}

   async getComputersByFilters (priceBorders: Array<Number>, sortObj: ISortObj) {
    const query: any = {
        price: {
          $gte: priceBorders[0], 
          $lte: priceBorders[1]   
        },
      };

      const computers = await ComputerModel
        .find(query)
        .sort(sortObj);
    
      return computers;
    }

    
    async getComponentsByFilters (priceBorders: Array<Number>, sortObj: ISortObj, type?: string) {
        const query: any = {
            price: {
              $gte: priceBorders[0], 
              $lte: priceBorders[1]   
            },
          };
        
          if (type) {
            query.type = type;
          }

          const components = await ComponentModel
            .find(query)
            .sort(sortObj);
        
          return components;
    }

    async createComponent(componentData: IComponent) {
      const component = new ComponentModel(componentData);
      const savedComponent = await component.save();

      const product = new ProductModel({
          category: 'Component',
          item_id: savedComponent._id
      });
      await product.save();

      return savedComponent;
  }

    async createComputer(computerData: IComputer) {
        const computer = new ComputerModel(computerData);
        const savedComputer = await computer.save();
        const product = new ProductModel({
            category: 'Computer',
            item_id: savedComputer._id
          });
          await product.save();

        return savedComputer;
    }

}

export default new MarketService();