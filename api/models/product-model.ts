import { Schema, model, Document } from 'mongoose';

interface IProduct {
    category: 'Computer' | 'Component' | 'Monitor' | 'Periphery';
    item_id: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
    category: {
        type: String,
        enum: ['Computer', 'Component', 'Monitor', 'Periphery'],
        required: true,
    },
    item_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'category',  // Динамічне посилання на колекції
    },
});

const ProductModel = model<IProduct>('Product', ProductSchema);

export { ProductModel, IProduct};