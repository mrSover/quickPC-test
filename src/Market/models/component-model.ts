import { Schema, model, Document } from 'mongoose';

interface IComponent extends Document {
  name: string;
  count: number;
  input_price: number;
  output_price: number;
  type: string; 
  description: string;
  is_on_sale: boolean;
  most_profitable: boolean,
  img: string;
}

const ComponentSchema = new Schema<IComponent>({
  name: String,
  count: Number,
  input_price: Number,
  output_price: Number,
  type: String, 
  description: String,
  is_on_sale: Boolean,
  most_profitable: Boolean,
  img: String,
});

const ComponentModel = model<IComponent>('Component', ComponentSchema);

export { ComponentModel };