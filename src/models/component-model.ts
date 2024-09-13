import { Schema, model, Document } from 'mongoose';

interface IComponent extends Document {
    name: string;
    count: number;
    input_price: number;
    price: number;
    type: string; 
    description: string;
    is_on_sale: boolean;
    is_hot: boolean;
    img: string;
}

const ComponentSchema = new Schema<IComponent>({
    name: String,
    count: Number,
    input_price: Number,
    price: Number,
    type: String, 
    description: String,
    is_on_sale: Boolean,
    is_hot: Boolean,
    img: String,
});

const ComponentModel = model<IComponent>('Component', ComponentSchema);

export { ComponentModel, IComponent };
