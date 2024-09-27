import { Schema, model, Document } from 'mongoose';

interface IMonitor extends Document {
    name: string;
    count: number;
    input_price: number;
    price: number;
    type: string; // Для моніторів, можна використовувати, наприклад, "LCD", "LED" і т.д.
    description: string;
    is_on_sale: boolean;
    is_hot: boolean;
    img: string;
    item_info: { 
        name: string;
        value: string;  
    }[];
}

const MonitorSchema = new Schema<IMonitor>({
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

const MonitorModel = model<IMonitor>('Monitor', MonitorSchema);

export { MonitorModel };
