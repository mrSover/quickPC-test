import { ObjectId, Types } from 'mongoose';
import { ComponentModel, IComponent } from '../models/component-model';
import { ComputerModel, IComputer } from '../models/computer-model';
import { ProductModel } from '../models/product-model';
import { ISortObj } from '../models/custom-types';
import ProductCatalog from '../dtos/product-catalog-dto';
import ProductSingle from '../dtos/product-item-dto';

class MarketService {

async getAllProducts(sortObj: ISortObj) {
    const products = await ProductModel
        .find()
        .populate('item_id')
        .sort(sortObj);

      return this.removeNesting(products).map((product: any) => new ProductCatalog(product));
    }

async getProductById(id: string) {
  const product = await ProductModel
      .findById(id)
      .populate('item_id')

      return new ProductSingle(this.removeNesting(product));
}

async getProductsByFilters(
  category: string, 
  type?: string, 
  priceBorders?: [number, number], 
  sortObj?: ISortObj
) {

  const products = await ProductModel
      .find({ category })
      .populate('item_id') 
      .sort(sortObj);

  let filteredProducts = products;

  if (priceBorders) {
    filteredProducts = filteredProducts.filter(product => {
      const item = product.item_id as any;
      return item.price >= priceBorders[0] && item.price <= priceBorders[1];
    });
  }

  if (type) {
    filteredProducts = filteredProducts.filter(product => {
      const item = product.item_id as any;
      return item.type === type;
    });
  }

  console.log(filteredProducts)
  console.log(this.removeNesting(filteredProducts).map((product: any) => new ProductCatalog(product)))
  return this.removeNesting(filteredProducts).map((product: any) => new ProductCatalog(product));
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