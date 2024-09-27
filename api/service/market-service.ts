import { ObjectId, Types } from 'mongoose';
import { ComponentModel, IComponent } from '../models/component-model';
import { ComputerModel, IComputer } from '../models/computer-model';
import { ProductModel } from '../models/product-model';
import { ISortObj } from '../models/custom-types';
import ProductCatalog from '../dtos/product-catalog-dto';
import ProductSingle from '../dtos/product-item-dto';

class MarketService {

async getAllProducts(sortObj: ISortObj, from: number, to: number) {
    const products = await ProductModel
        .find()
        .populate('item_id')
        .sort(sortObj)

        const prices = products.map(product => {
          const item = product.item_id as any;
          return item.price;
        });
      
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const count =products.length

        const result = ( this
          .removeNesting(products)
          .map((product: any) => new ProductCatalog(product)))
          .slice(from, to);

          

      return {count, minPrice, maxPrice, result};
    }

async getProductById(id: string) {
  const product = await ProductModel
      .findById(id)
      .populate('item_id')

      return new ProductSingle(this.removeNesting(product));
}

async getProductsByFilters(
  category: string, 
  from: number, 
  to: number,
  priceBorders: [number, number], 
  sortObj: ISortObj,
  type?: string
) {

  let products = await ProductModel
    .find({ category })
    .populate('item_id') 
    .sort(sortObj);

  products = products.filter(product => {
    const item = product.item_id as any;
    return item.price >= priceBorders[0] && item.price <= priceBorders[1];
  });

  if (type) {
    products = products.filter(product => {
      const item = product.item_id as any;
      return item.type === type;
    });
  }

  const prices = products.map(product => {
    const item = product.item_id as any;
    return item.price;
  });

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const count = products.length;

  const result = this
    .removeNesting(products)
    .map((product: any) => new ProductCatalog(product))
    .slice(from, to);



  return { count, minPrice, maxPrice, result };
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

    removeNesting(data: any | any[]) {
      if (Array.isArray(data)) {
        return data.map(item => {
          const itemData = JSON.parse(JSON.stringify(item.item_id as any));
          return {
            ...itemData,
            _id: item._id,
            category: item.category, 
          };
        });
      } else {
        const itemData = JSON.parse(JSON.stringify(data.item_id as any));
        return {
          ...itemData,
          _id: data._id,
          category: data.category,
          
        };
      }
    }
}

export default new MarketService();