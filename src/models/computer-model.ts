import { Schema, model } from 'mongoose';

interface IComputer {
  name: string;
  price: number;
  img: string;
  description: string;
  is_hot: boolean;
  components: Schema.Types.ObjectId[];
}

const ComputerSchema = new Schema<IComputer>({
    name: String,
    price: Number,
    img: String,
    description: String,
    is_hot: Boolean,
    components: [{ type: Schema.Types.ObjectId, ref: 'Component' }],
  });

  const ComputerModel = model<IComputer>('Computer', ComputerSchema);

export { ComputerModel, IComputer};