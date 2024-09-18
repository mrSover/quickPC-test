import { ObjectId, Types } from 'mongoose';
import { ComponentModel, IComponent } from '../models/component-model';
import { ComputerModel, IComputer } from '../models/computer-model';
import { ProductModel } from '../models/product-model';
import { ISortObj } from '../models/custom-types';
import ProductCatalog from '../dtos/product-catalog-dto';

class MarketService {

async getAllProducts(sortObj: ISortObj) {
    const products = await ProductModel
        .find()
        .populate('item_id')
        .sort(sortObj);

        
      const productDTO = this.removeNesting(products).map((product: any) => new ProductCatalog(product));
      console.log('iaojginaujighnaui')
      return productDTO;
    }

async getProductById(id: string) {
  const product = await ProductModel
      .findOne({_id: id})
      .populate('item_id')

      return this.removeNesting(product);
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
  const productDTO = this.removeNesting(filteredProducts).map((product: any) => new ProductCatalog(product));
  return productDTO
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
            _id: item._id,
            category: item.category,
            ...itemData
          };
        });
      } else {
        const itemData = JSON.parse(JSON.stringify(data.item_id as any));
        return {
          _id: data._id,
          category: data.category,
          ...itemData
        };
      }
    }
}

export default new MarketService();