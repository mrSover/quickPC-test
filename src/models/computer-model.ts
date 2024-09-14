import { Schema, model } from 'mongoose';

interface IComputer {
  name: string;
  price: number;
  img: string;
  description: string;
  is_hot: boolean;
  components: { name: string; value: string }[]; // Масив ключ-значення для компонентів
}

const ComputerSchema = new Schema<IComputer>({
  name: String,
  price: Number,
  img: String,
  description: String,
  is_hot: Boolean,
  components: [{ 
    name: String,
    value: String  
  }]
});

const ComputerModel = model<IComputer>('Computer', ComputerSchema);

export { ComputerModel, IComputer };