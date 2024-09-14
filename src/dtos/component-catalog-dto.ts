import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export default class ComponentCatalogDto {
    _id: ObjectId
    name: string;
    type: string;
    price: number;
    is_on_sale: boolean;
    is_hot: boolean;
    img: string;


    constructor(model: ComponentCatalogDto) {
        this._id = model._id
        this.name = model.name
        this.type = model.type
        this.price = model.price
        this.is_on_sale = model.is_on_sale
        this.is_hot = model.is_hot
        this.img = model.img
    }
} 