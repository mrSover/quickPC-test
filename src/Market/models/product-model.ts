import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
    category: 'computer' | 'component';
    item_id: Schema.Types.ObjectId;
  }

const ProductSchema = new Schema<IProduct>({
    category: {
      type: String,
      enum: ['computer', 'component'], 
      required: true,
    },
    item_id: {
      type: Schema.Types.ObjectId, 
      required: true,
      refPath: 'type',
    },
  });

const ProductModel = model<IProduct>('Product', ProductSchema);

export { ProductModel };