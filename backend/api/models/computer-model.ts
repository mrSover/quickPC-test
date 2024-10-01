import { Schema, model } from 'mongoose';

interface IComputer {
  name: string;
  count: number;
  input_price: number;
  price: number;
  type: string; 
  description: string;
  is_on_sale: boolean;
  is_hot: boolean;
  img: string;
  item_info: { 
      name: string;
      value: string;  
  }[];
}

const ComputerSchema = new Schema<IComputer>({
  name: String,
  count: Number,
  input_price: Number,
  price: Number,
  type: String, // офісний або ігровий
  description: String,
  is_on_sale: Boolean,
  is_hot: Boolean,
  img: String,
  item_info: [{ 
      name: String,
      value: String  
  }]
});

const ComputerModel = model<IComputer>('Computer', ComputerSchema);

export { ComputerModel, IComputer };