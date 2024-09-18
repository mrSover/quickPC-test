import { Schema, model, Document } from 'mongoose';

interface IPeriphery extends Document {
    name: string;
    count: number;
    input_price: number;
    price: number;
    type: string; // Для периферії, тип може бути "Keyboard", "Mouse", "Headset" і т.д.
    description: string;
    is_on_sale: boolean;
    is_hot: boolean;
    img: string;
    item_info: { 
        name: string;
        value: string;  
    }[];
}

const PeripherySchema = new Schema<IPeriphery>({
    name: String,
    count: Number,
    input_price: Number,
    price: Number,
    type: String,
    description: String,
    is_on_sale: Boolean,
    is_hot: Boolean,
    img: String,
    item_info: [{ 
        name: String,
        value: String  
    }]
});

const PeripheryModel = model<IPeriphery>('Periphery', PeripherySchema);

export { PeripheryModel };