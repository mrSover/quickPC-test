import { Schema, model, Document } from 'mongoose';

interface IComputer extends Document {
  name: string;
  price: number;
  img: string;
  description: string;
  most_profitable: boolean;
  components: Schema.Types.ObjectId[];
}

const ComputerSchema = new Schema<IComputer>({
    name: String,
    price: Number,
    img: String,
    description: String,
    most_profitable: Boolean,
    components: [{ type: Schema.Types.ObjectId, ref: 'Component' }],
  });

  const ComputerModel = model<IComputer>('Computer', ComputerSchema);

export { ComputerModel };