"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductCatalog {
    constructor(model) {
        this._id = model._id;
        this.category = model.category;
        this.name = model.name;
        this.type = model.type;
        this.price = model.price;
        this.is_on_sale = model.is_on_sale;
        this.is_hot = model.is_hot;
        this.img = model.img;
    }
}
exports.default = ProductCatalog;
